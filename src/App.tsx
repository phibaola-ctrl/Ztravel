import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  MapPin, 
  Star, 
  ArrowLeft, 
  Navigation,
  Compass,
  Image as ImageIcon,
  Youtube,
  CheckCircle,
  SortAsc,
  SortDesc,
  ArrowDownAz,
  Search,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_LOCATIONS, TravelLocation } from './data';

// --- Favorites Persistence ---
const getStoredFavorites = (): string[] => {
  const stored = localStorage.getItem('vietnam_travel_favorites');
  return stored ? JSON.parse(stored) : [];
};

const saveFavorites = (favs: string[]) => {
  localStorage.setItem('vietnam_travel_favorites', JSON.stringify(favs));
};

// --- Custom Locations Persistence ---
const getStoredLocations = (): TravelLocation[] => {
  const stored = localStorage.getItem('vietnam_travel_custom_locations');
  return stored ? JSON.parse(stored) : [];
};

const saveLocations = (locs: TravelLocation[]) => {
  localStorage.setItem('vietnam_travel_custom_locations', JSON.stringify(locs.filter(l => !MOCK_LOCATIONS.find(m => m.id === l.id))));
};

const createPlace = (keyword: string): TravelLocation => {
  return {
    id: `custom-${Date.now()}`,
    name: keyword,
    location: keyword,
    city: keyword,
    country: 'Vietnam', // Default to Vietnam for auto-created
    description: `Địa điểm ${keyword} là một nơi nổi bật với cảnh đẹp, văn hóa đặc trưng và nhiều hoạt động khám phá thú vị dành cho du khách.`,
    rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
    tags: ["#travel", "#explore", `#${keyword.replace(/\s/g, "").toLowerCase()}`],
    lat: 0,
    lng: 0,
    whyVisit: [
      `Khám phá vẻ đẹp độc đáo tại ${keyword}`,
      "Trải nghiệm văn hóa và đời sống địa phương",
      "Lưu lại những khoảnh khắc check-in tuyệt đẹp"
    ]
  };
};

// --- Utils ---
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- Home Component (List View) ---
function HomePage({ 
  locations, 
  setLocations,
  favorites, 
  toggleFavorite, 
  showFavoritesOnly 
}: { 
  locations: TravelLocation[],
  setLocations: React.Dispatch<React.SetStateAction<TravelLocation[]>>,
  favorites: string[], 
  toggleFavorite: (id: string) => void,
  showFavoritesOnly: boolean
}) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'rating-desc' | 'rating-asc' | 'name-asc'>('rating-desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'Vietnam' | 'International'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Daily suggestions state
  const [suggestions, setSuggestions] = useState<TravelLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initial random suggestions (load 6)
    setSuggestions(shuffleArray(locations).slice(0, 6));
  }, [locations.length]); // Re-run if data length changes

  const handleRefreshDiscovery = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSuggestions(shuffleArray(locations).slice(0, 6));
      setIsLoading(false);
    }, 600);
  };

  const filteredAndSortedLocations = useMemo(() => {
    let result = [...locations];

    if (showFavoritesOnly) {
      result = result.filter(loc => favorites.includes(loc.id));
    }

    if (selectedCountry !== 'all') {
      result = result.filter(loc => loc.country === selectedCountry);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(loc => 
        loc.name.toLowerCase().includes(query) || 
        loc.city.toLowerCase().includes(query)
      );
    }

    return result.sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'rating-asc') return a.rating - b.rating;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [locations, sortBy, searchQuery, selectedCountry, showFavoritesOnly, favorites]);

  const handleSearchTrigger = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const existing = locations.filter(loc => 
      loc.name.toLowerCase().includes(query) || 
      loc.city.toLowerCase().includes(query)
    );

    if (existing.length === 0) {
      const newPlace = createPlace(searchQuery);
      setLocations(prev => [newPlace, ...prev]);
      setNotification(`Không tìm thấy, đã tạo địa điểm mới "${searchQuery}" cho bạn!`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-10 px-6"
    >
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-3"
          >
            <CheckCircle size={20} />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">
            {showFavoritesOnly ? 'Địa điểm yêu thích' : 'Z Travel'}
          </h1>
          <p className="text-slate-500 font-medium mb-6">
            {showFavoritesOnly ? `Danh sách các địa điểm bạn đã lưu (${favorites.length})` : 'Gợi ý hôm nay cho bạn'}
          </p>
          
          {!showFavoritesOnly && (
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={handleRefreshDiscovery}
                className="flex items-center gap-2 bg-brand-50 text-brand-600 px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-brand-100 transition-all disabled:opacity-50"
                disabled={isLoading}
              >
                <Compass size={18} className={isLoading ? 'animate-spin' : ''} />
                <span>{isLoading ? 'Đang lọc...' : 'Khám phá'}</span>
              </button>
              
              <div className="flex bg-slate-100 p-1.5 rounded-[1.25rem]">
                {(['all', 'Vietnam', 'International'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCountry(c)}
                    className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[2px] rounded-xl transition-all ${
                      selectedCountry === c ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    {c === 'all' ? 'Tất cả' : c === 'Vietnam' ? 'Việt Nam' : 'Quốc tế'}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm tên địa điểm hoặc thành phố..."
                className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
              />
            </div>
            <button 
              onClick={handleSearchTrigger}
              className="bg-brand-600 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-brand-100 hover:bg-brand-700 transition-all"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg">Sắp xếp:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-100 rounded-xl py-2.5 px-4 shadow-sm text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer pr-10 relative min-w-[160px]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394a3b8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="rating-desc">Đánh giá cao nhất</option>
              <option value="rating-asc">Đánh giá thấp nhất</option>
              <option value="name-asc">Tên (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {(!searchQuery && !showFavoritesOnly && selectedCountry === 'all' ? suggestions : filteredAndSortedLocations).map((loc) => {
            const isFav = favorites.includes(loc.id);
            return (
              <motion.div 
                key={loc.id} 
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ scale: 1.01, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center justify-between hover:shadow-[0_20px_50px_rgba(148,163,184,0.18)] hover:border-brand-100 transition-all group cursor-pointer relative mb-1"
              onClick={() => navigate(`/place/${loc.id}`)}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {loc.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                  <MapPin size={14} className="text-brand-400" />
                  <span>{loc.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(loc.id);
                  }}
                  className={`p-2.5 rounded-xl transition-all ${isFav ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-300 hover:text-rose-400'}`}
                >
                  <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                </button>
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100">
                  <Star size={18} fill="#F59E0B" className="text-amber-500" />
                  <span className="font-black text-amber-700">{loc.rating}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>
        
        {filteredAndSortedLocations.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl font-medium">Không tìm thấy địa điểm nào phù hợp.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- Detail Component ---
function PlaceDetailPage({ 
  locations,
  favorites, 
  toggleFavorite 
}: { 
  locations: TravelLocation[],
  favorites: string[], 
  toggleFavorite: (id: string) => void 
}) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = locations.find(l => l.id === id);
  const isFav = location ? favorites.includes(location.id) : false;

  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'photos' | 'video'>('overview');

  const relatedLocations = useMemo(() => {
    if (!location) return [];
    return locations
      .filter(loc => loc.id !== location.id)
      .filter(loc => 
        loc.city === location.city || 
        loc.tags.some(tag => location.tags.includes(tag))
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [locations, location]);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy địa điểm</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-brand-600 font-bold hover:underline"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const openGoogleMaps = () => {
    const query = location.lat !== 0 ? `${location.lat},${location.lng}` : encodeURIComponent(location.name);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const openGoogleImages = () => {
    const query = encodeURIComponent(`${location.name} Travel`);
    window.open(`https://www.google.com/search?tbm=isch&q=${query}`, '_blank');
  };

  const openYouTube = () => {
    const query = encodeURIComponent(`${location.name} du lịch Vietnam`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto py-10 px-6"
    >
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại danh sách</span>
        </button>
        <button 
          onClick={() => { if(location) toggleFavorite(location.id) }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-[2px] transition-all ${
            isFav 
              ? 'bg-rose-50 text-rose-500 shadow-sm' 
              : 'bg-white border border-slate-100 text-slate-400 hover:text-rose-400'
          }`}
        >
          <Heart size={14} fill={isFav ? "currentColor" : "none"} />
          {isFav ? 'Đã lưu' : 'Lưu yêu thích'}
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            {location.tags.map(tag => (
              <span key={tag} className="bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mr-2">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tight">
            {location.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-500 font-bold">
            <div className="flex items-center gap-2">
              <MapPin size={22} className="text-brand-600" />
              <span className="text-xl">{location.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl">
              <Star size={20} fill="#F59E0B" className="text-amber-500" />
              <span className="text-amber-700 text-lg">{location.rating} Rating</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 p-1.5 bg-slate-50 rounded-2xl w-fit">
          {[
            { id: 'overview', label: 'Tổng quan', icon: Compass },
            { id: 'map', label: 'Bản đồ', icon: Navigation },
            { id: 'photos', label: 'Hình ảnh', icon: ImageIcon },
            { id: 'video', label: 'Video', icon: Youtube },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-12">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[4px] mb-4">Thông tin chi tiết</h3>
                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                  {location.description}
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[4px] mb-5">Tại sao nên đến?</h3>
                <ul className="space-y-4">
                  {location.whyVisit.map((reason, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-4 text-slate-700 font-bold text-lg"
                    >
                      <CheckCircle size={24} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="aspect-video w-full rounded-[2rem] overflow-hidden border border-slate-100 mb-10"
            >
              <iframe
                title="Bản đồ"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                /* Better to use the standard non-API embed for zero-config */
                src={`https://maps.google.com/maps?q=${encodeURIComponent(location.name + ' ' + (location.city || ''))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
            </motion.div>
          )}

          {activeTab === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[400px] flex flex-col items-center justify-center text-center p-10 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed"
            >
              <ImageIcon size={64} className="text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4">Khám phá hình ảnh</h3>
              <p className="text-slate-500 font-medium mb-8 max-w-md">Vì quy định của các bộ máy tìm kiếm, chúng tôi không thể nhúng trực tiếp kết quả vào đây. Hãy bấm nút bên dưới để xem hàng ngàn bức ảnh tuyệt đẹp về {location.name}.</p>
              <button 
                onClick={openGoogleImages}
                className="bg-brand-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all flex items-center gap-3"
              >
                <Compass size={20} />
                <span>Xem trên Google Images</span>
              </button>
            </motion.div>
          )}

          {activeTab === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[400px] flex flex-col items-center justify-center text-center p-10 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed"
            >
              <Youtube size={64} className="text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4">Xem Video du lịch</h3>
              <p className="text-slate-500 font-medium mb-8 max-w-md">Khám phá {location.name} qua những thước phim sống động trên YouTube. Bấm vào nút bên dưới để xem các video review mới nhất.</p>
              <button 
                onClick={openYouTube}
                className="bg-rose-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-rose-100 hover:bg-rose-700 transition-all flex items-center gap-3"
              >
                <Youtube size={20} />
                <span>Xem trên YouTube</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      {/* Related Locations Section */}
      {relatedLocations.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8 px-4">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Địa điểm tương tự</h3>
            <div className="h-[2px] flex-1 mx-8 bg-slate-100 hidden md:block"></div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x scrollbar-hide">
            {relatedLocations.map((rel) => (
              <motion.div
                key={rel.id}
                whileHover={{ y: -5 }}
                className="min-w-[280px] bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all snap-start cursor-pointer group"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/place/${rel.id}`);
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {rel.tags[0]}
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star size={12} fill="#F59E0B" className="text-amber-500" />
                    <span className="text-amber-700 text-xs font-bold">{rel.rating}</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-1">
                  {rel.name}
                </h4>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <MapPin size={12} className="text-brand-400" />
                  <span>{rel.city}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// --- Sidebar Layout ---
function DashboardLayout({ 
  children, 
  favoritesCount, 
  showFavoritesOnly, 
  setShowFavoritesOnly 
}: { 
  children: React.ReactNode,
  favoritesCount: number,
  showFavoritesOnly: boolean,
  setShowFavoritesOnly: (val: boolean) => void
}) {
  return (
    <div className="min-h-screen bg-[#FCFCFD] flex font-sans">
      <aside className="w-72 bg-white border-r border-slate-100 p-8 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="mb-14 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-100">
            <Compass size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 font-display">Z-TRAVEL</h1>
        </div>

        <nav className="space-y-4">
          <Link 
            to="/" 
            onClick={() => setShowFavoritesOnly(false)}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold ${!showFavoritesOnly ? 'bg-brand-600 text-white shadow-xl shadow-brand-100' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <HomeIcon size={22} />
            <span>Trang chủ</span>
          </Link>
          <button 
            onClick={() => setShowFavoritesOnly(true)}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold w-full text-left ${showFavoritesOnly ? 'bg-rose-500 text-white shadow-xl shadow-rose-100' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Heart size={22} fill={showFavoritesOnly ? "currentColor" : "none"} />
            <span>Yêu thích ({favoritesCount})</span>
          </button>
        </nav>

        <div className="mt-auto bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tips</p>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">Bấm vào từng địa điểm để khám phá thông tin chi tiết và dẫn đường nhanh chóng qua Google Maps.</p>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

// --- App Entry point ---
export default function App() {
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites());
  const [locations, setLocations] = useState<TravelLocation[]>([...MOCK_LOCATIONS, ...getStoredLocations()]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    saveLocations(locations);
  }, [locations]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id) 
        : [...prev, id]
    );
  };

  return (
    <BrowserRouter>
      <DashboardLayout 
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      >
        <Routes>
          <Route path="/" element={
            <HomePage 
              locations={locations}
              setLocations={setLocations}
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
              showFavoritesOnly={showFavoritesOnly}
            />
          } />
          <Route path="/place/:id" element={
            <PlaceDetailPage 
              locations={locations}
              favorites={favorites} 
              toggleFavorite={toggleFavorite} 
            />
          } />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
