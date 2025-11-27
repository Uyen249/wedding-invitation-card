import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin, Calendar, Clock, Gift, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [showRSVP, setShowRSVP] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [formData, setFormData] = useState({ name: '', attending: 'yes', message: '' });
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminGuest, setAdminGuest] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const headerPhotos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600'
  ];

  const weddingDate = new Date('2025-12-28T11:00:00');

  const photos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800'
  ];

  const calendarDays = () => {
    const firstDay = new Date(2025, 11, 1).getDay();
    const daysInMonth = 31;
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    if (guest) {
      setGuestName(decodeURIComponent(guest));
      setFormData(prev => ({ ...prev, name: decodeURIComponent(guest) }));
    }

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    const handleKeyPress = (e) => {
      if (e.key === 'a' || e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      clearInterval(timer);
      window.removeEventListener('keydown', handleKeyPress);
      observer.disconnect();
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Vui lòng nhập họ tên!');
      return;
    }
    
    const message = `
📨 XÁC NHẬN THAM DỰ MỚI
👤 Họ tên: ${formData.name}
✅ Tham dự: ${formData.attending === 'yes' ? 'Có, sẽ đến' : 'Không thể tham dự'}
💌 Lời chúc: ${formData.message || '(Không có)'}
    `.trim();

    console.log('Thông tin xác nhận:', message);
    alert(`Cảm ơn ${formData.name}!\n\nChúng tôi đã ghi nhận xác nhận của bạn. ${formData.attending === 'yes' ? 'Rất mong được gặp bạn!' : 'Rất tiếc vì bạn không thể đến.'}`);
    
    setShowRSVP(false);
    setFormData({ name: guestName || '', attending: 'yes', message: '' });
  };

  const applyGuestName = () => {
    if (adminGuest.trim()) {
      const newUrl = `${window.location.pathname}?guest=${encodeURIComponent(adminGuest)}`;
      window.history.pushState({}, '', newUrl);
      setGuestName(adminGuest);
      setFormData(prev => ({ ...prev, name: adminGuest }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap');
        
        .couple-names {
          font-family: 'Allura', cursive;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          letter-spacing: 2px;
        }
        
        .elegant-text {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .paper-texture {
          background-color: #fafafa;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.01) 2px, rgba(0,0,0,.01) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.01) 2px, rgba(0,0,0,.01) 4px);
          box-shadow: 
            0 1px 3px rgba(0,0,0,0.12),
            0 1px 2px rgba(0,0,0,0.24),
            inset 0 0 80px rgba(0,0,0,0.02);
        }
        
        .header-bg {
          position: relative;
          background: #f5f5f5;
        }
        
        .header-photo-grid {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
        }
        
        .header-photo {
          position: relative;
          overflow: hidden;
        }
        
        .header-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .header-photo:nth-child(1) {
          transform: rotate(-2deg);
          margin-top: -10px;
        }
        
        .header-photo:nth-child(2) {
          transform: rotate(1deg);
          margin-top: 10px;
        }
        
        .header-photo:nth-child(3) {
          transform: rotate(-1deg);
          margin-top: 5px;
        }
        
        .header-photo:nth-child(4) {
          transform: rotate(2deg);
          margin-top: -5px;
        }
        
        .header-photo:hover img {
          transform: scale(1.05);
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        .heart-pulse {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-on-scroll {
          opacity: 0;
        }
        
        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <audio ref={audioRef} loop>
        <source src="https://www.bensound.com/bensound-music/bensound-romantic.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-all hover:scale-110"
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      {showAdmin && (
        <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-xl border-2 border-rose-300">
          <div className="text-sm font-semibold mb-2">🔐 Admin Panel</div>
          <input
            type="text"
            placeholder="Tên khách mời"
            value={adminGuest}
            onChange={(e) => setAdminGuest(e.target.value)}
            className="border rounded px-2 py-1 text-sm w-full mb-2"
          />
          <button
            onClick={applyGuestName}
            className="bg-rose-500 text-white px-3 py-1 rounded text-sm w-full hover:bg-rose-600"
          >
            Apply
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-96 header-bg flex items-center justify-center">
            <div className="header-photo-grid">
              {headerPhotos.map((photo, index) => (
                <div key={index} className="header-photo">
                  <img src={photo} alt={`Wedding ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900/60 to-pink-900/60"></div>
            <div className="relative z-10 text-center text-white px-4">
              <div className="mb-6">
                <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              </div>
              <h1 className="couple-names text-6xl md:text-7xl mb-2">
                Bùi Hữu Hoàng
              </h1>
              <div className="text-4xl my-4 font-light elegant-text">&</div>
              <h1 className="couple-names text-6xl md:text-7xl mb-6">
                Tạ Thị Thanh Uyên
              </h1>
              <div className="text-xl font-light tracking-widest elegant-text">
                28 • 12 • 2025
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-12 animate-on-scroll">
              <p className="text-xl text-gray-700 italic mb-2 elegant-text">
                With hearts full of love,
              </p>
              <p className="text-lg text-gray-600 elegant-text">
                we are grateful to share this beautiful moment with you
              </p>
            </div>

            <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 mb-12 border-2 border-rose-200 animate-on-scroll">
              <h2 className="text-2xl font-semibold text-center text-rose-800 elegant-text mb-4">
                TRÂN TRỌNG KÍNH MỜI
              </h2>
              
              <div className="text-center mb-6">
                <div className="min-h-[2rem] flex items-center justify-center mb-3">
                  {guestName ? (
                    <div className="text-rose-700 font-semibold text-xl elegant-text">
                      {guestName}
                    </div>
                  ) : (
                    <div className="text-gray-300 text-lg elegant-text italic">
                      Tên khách mời
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  <div className="border-t-2 border-rose-400" style={{width: '280px'}}></div>
                </div>
              </div>
              
              <div className="text-center space-y-3 text-gray-700 elegant-text">
                <p className="text-base">
                  TỚI DỰ BỮA CƠM THÂN MẬT
                </p>
                <p className="text-base">
                  CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI
                </p>
                <div className="my-6">
                  <p className="text-lg font-semibold text-rose-700 mb-2">VÀO LÚC</p>
                  <p className="text-xl font-bold text-rose-800" style={{fontFamily: 'Courier New, monospace'}}>
                    11H00 NGÀY 28 THÁNG 12 NĂM 2025
                  </p>
                  <p className="text-sm text-gray-600 mt-2">(Tức ngày 09 tháng 11 năm Ất Tỵ)</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 mt-4">
                  <div className="flex items-start justify-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">TẠI NHÀ HÀNG SÔNG HỒNG THỦ ĐÔ</p>
                      <p className="text-sm text-gray-600">Tứ Xã - Lâm Thao - Phú Thọ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 animate-on-scroll">
              <a
                href="https://maps.app.goo.gl/ojoZWGjJr6WTd9rx8"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <MapPin className="inline-block w-5 h-5 mr-2" />
                Xem bản đồ đường đi
              </a>
            </div>

            <div className="paper-texture rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 animate-on-scroll max-w-lg mx-auto">
              <h3 className="text-2xl font-semibold text-center text-gray-800 elegant-text mb-4 pb-3 border-b-2 border-rose-400">
                LỄ THÀNH HÔN
              </h3>
              
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600" 
                  alt="Ceremony"
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="text-center mb-6">
                <p className="text-xl font-bold text-gray-800 mb-2" style={{fontFamily: 'Courier New, monospace'}}>
                  10:30 28/12/2025
                </p>
                <p className="text-sm text-gray-600">(Tức ngày 09 tháng 11 năm Ất Tỵ)</p>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-base text-gray-700 leading-relaxed elegant-text">
                  Nhà hàng Sông Hồng Thủ Đô<br/>
                  Tứ Xã - Lâm Thao - Phú Thọ
                </p>
              </div>
            </div>

            <div className="mb-12 animate-on-scroll">
              <a
                href="https://maps.app.goo.gl/ojoZWGjJr6WTd9rx8"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                <MapPin className="inline-block w-5 h-5 mr-2" />
                Xem bản đồ đường đi
              </a>
            </div>

            <div className="text-center mb-12 animate-on-scroll">
              <button
                onClick={() => setShowRSVP(!showRSVP)}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                {showRSVP ? 'Đóng form' : 'Xác nhận tham dự'}
              </button>
            </div>

            {showRSVP && (
              <div className="mb-12 bg-rose-50 rounded-2xl p-8 border-2 border-rose-200">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 elegant-text">
                  Xác nhận tham dự
                </h3>
                <div className="space-y-5 max-w-2xl mx-auto">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2 elegant-text">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập họ tên của bạn"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-base bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2 elegant-text">
                      Xác nhận tham dự *
                    </label>
                    <select
                      value={formData.attending}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-base bg-white"
                    >
                      <option value="yes">✓ Tôi sẽ đến</option>
                      <option value="no">✗ Rất tiếc, tôi không thể tham dự</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2 elegant-text">
                      Gửi lời chúc đến cô dâu chú rể
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      placeholder="Gửi lời chúc mừng hạnh phúc đến đôi uyên ương..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 resize-none text-base bg-white"
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 text-lg"
                  >
                    Gửi xác nhận
                  </button>
                </div>
              </div>
            )}

            <div className="mb-12 animate-on-scroll">
              <h2 className="text-2xl font-serif text-center mb-6 text-gray-800 elegant-text">
                Album Ảnh Cưới
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                  >
                    <img
                      src={photo}
                      alt={`Wedding photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12 animate-on-scroll">
              <h2 className="text-2xl font-serif text-center mb-6 text-gray-800 elegant-text">
                Tháng 12 năm 2025
              </h2>
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays().map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                        day === 28
                          ? 'bg-rose-500 text-white font-bold relative heart-pulse'
                          : day
                          ? 'bg-white text-gray-700 hover:bg-rose-100'
                          : ''
                      }`}
                    >
                      {day === 28 ? (
                        <div className="relative">
                          <Heart className="w-6 h-6 fill-current" />
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {day}
                          </span>
                        </div>
                      ) : (
                        day
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 mb-12 animate-on-scroll">
              <h2 className="text-2xl font-serif text-center mb-6 text-rose-800 elegant-text">
                Đếm ngược đến ngày trọng đại
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-3xl font-bold text-rose-600">{value}</div>
                      <div className="text-sm text-gray-600 mt-1 capitalize">
                        {unit === 'days' ? 'Ngày' : unit === 'hours' ? 'Giờ' : unit === 'minutes' ? 'Phút' : 'Giây'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center text-gray-600 animate-on-scroll">
              <Heart className="w-6 h-6 mx-auto mb-2 text-rose-500" />
              <p className="text-sm elegant-text">
                Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
              </p>
              <p className="text-xs mt-2 elegant-text">
                Bùi Hữu Hoàng & Tạ Thị Thanh Uyên
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}