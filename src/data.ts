/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TravelLocation {
  id: string;
  name: string;
  location: string;
  city: string;
  country: 'Vietnam' | 'International';
  description: string;
  rating: number;
  lat: number;
  lng: number;
  tags: string[];
  whyVisit: string[];
}

export const MOCK_LOCATIONS: TravelLocation[] = [
  // VIETNAM
  {
    id: 'vn-1',
    name: 'Đà Lạt',
    location: 'Lâm Đồng, Việt Nam',
    city: 'Đà Lạt',
    country: 'Vietnam',
    description: 'Thành phố ngàn hoa với khí hậu ôn đới quanh năm, những đồi thông xanh mướt và kiến trúc Pháp cổ kính.',
    rating: 4.8,
    lat: 11.9404,
    lng: 108.4583,
    tags: ['#dalat', '#nature', '#chill'],
    whyVisit: ['Tận hưởng không khí trong lành', 'Check-in quán cafe view rừng thông', 'Trải nghiệm săn mây buổi sáng']
  },
  {
    id: 'vn-2',
    name: 'Hội An',
    location: 'Quảng Nam, Việt Nam',
    city: 'Hội An',
    country: 'Vietnam',
    description: 'Phố cổ ven sông với những bức tường vàng đặc trưng, lồng đèn lung linh và di sản văn hóa thế giới UNESCO.',
    rating: 4.9,
    lat: 15.8801,
    lng: 108.3380,
    tags: ['#hoian', '#culture', '#oldtown'],
    whyVisit: ['Đi dạo phố đèn lồng về đêm', 'Thả hoa đăng trên sông Hoài', 'Thưởng thức Cao lầu chuẩn vị']
  },
  {
    id: 'vn-3',
    name: 'Phú Quốc',
    location: 'Kiên Giang, Việt Nam',
    city: 'Phú Quốc',
    country: 'Vietnam',
    description: 'Đảo Ngọc với những bãi biển xanh ngắt, cát trắng mịn và dịch vụ nghỉ dưỡng cao cấp hàng đầu.',
    rating: 4.7,
    lat: 10.2289,
    lng: 103.9572,
    tags: ['#phuquoc', '#beach', '#island'],
    whyVisit: ['Ngắm hoàng hôn trên biển', 'Lặn ngắm san hô tại Nam Đảo', 'Thăm vườn tiêu và nhà máy nước mắm']
  },
  {
    id: 'vn-4',
    name: 'Vịnh Hạ Long',
    location: 'Quảng Ninh, Việt Nam',
    city: 'Hạ Long',
    country: 'Vietnam',
    description: 'Kỳ quan thiên nhiên thế giới với hàng ngàn hòn đảo đá vôi kỳ vĩ và hệ thống hang động đặc sắc.',
    rating: 4.9,
    lat: 20.9101,
    lng: 107.1839,
    tags: ['#halong', '#wonder', '#cruise'],
    whyVisit: ['Nghỉ đêm trên du thuyền sang trọng', 'Chèo Kayak khám phá hang động', 'Thăm động Thiên Cung và hang Sửng Sốt']
  },
  {
    id: 'vn-5',
    name: 'Sapa',
    location: 'Lào Cai, Việt Nam',
    city: 'Sapa',
    country: 'Vietnam',
    description: 'Thị trấn mờ sương với ruộng bậc thang kỳ vĩ, đỉnh Fansipan hùng vĩ và văn hóa dân tộc vùng cao.',
    rating: 4.6,
    lat: 22.3364,
    lng: 103.8438,
    tags: ['#sapa', '#mountain', '#fansipan'],
    whyVisit: ['Chinh phục nóc nhà Đông Dương', 'Check-in bản Cát Cát', 'Ăn lẩu cá hồi giữa trời lạnh']
  },
  {
    id: 'vn-6',
    name: 'Ninh Bình',
    location: 'Ninh Bình, Việt Nam',
    city: 'Ninh Bình',
    country: 'Vietnam',
    description: 'Được mệnh danh là "Hạ Long trên cạn" với quần thể danh thắng Tràng An và cố đô Hoa Lư cổ kính.',
    rating: 4.8,
    lat: 20.2506,
    lng: 105.9745,
    tags: ['#trangan', '#nature', '#history'],
    whyVisit: ['Đi thuyền trôi theo dòng sông Ngô Đồng', 'Chinh phục đỉnh Hang Múa', 'Thăm chùa Bái Đính quy mô']
  },

  // INTERNATIONAL
  {
    id: 'int-1',
    name: 'Tokyo',
    location: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'International',
    description: 'Trái tim của Nhật Bản, nơi hội tụ giữa công nghệ tương lai và những giá trị truyền thống bền vững.',
    rating: 4.8,
    lat: 35.6762,
    lng: 139.6503,
    tags: ['#tokyo', '#japan', '#tech'],
    whyVisit: ['Khám phá giao lộ Shibuya sầm uất', 'Thăm đền Senso-ji cổ kính', 'Thưởng thức Sushi chuẩn Michelin']
  },
  {
    id: 'int-2',
    name: 'Paris',
    location: 'Paris, France',
    city: 'Paris',
    country: 'International',
    description: 'Kinh đô ánh sáng, nơi tinh hoa nghệ thuật, thời trang và ẩm thực hội tụ bên dòng sông Seine.',
    rating: 4.7,
    lat: 48.8566,
    lng: 2.3522,
    tags: ['#paris', '#art', '#romance'],
    whyVisit: ['Ngắm tháp Eiffel rực rỡ', 'Thăm bảo tàng Louvre rộng lớn', 'Đi dạo khu Montmartre lãng mạn']
  },
  {
    id: 'int-3',
    name: 'Bali',
    location: 'Bali, Indonesia',
    city: 'Bali',
    country: 'International',
    description: 'Hòn đảo thiên đường với văn hóa tâm linh độc đáo, những bãi biển lướt sóng và ruộng bậc thang xanh ngắt.',
    rating: 4.9,
    lat: -8.4095,
    lng: 115.1889,
    tags: ['#bali', '#tropical', '#yoga'],
    whyVisit: ['Check-in cổng trời Lempuyang', 'Ngắm hoàng hôn tại đền Tanah Lot', 'Trải nghiệm chèo thuyền ở Ubud']
  },
  {
    id: 'int-4',
    name: 'Seoul',
    location: 'Seoul, South Korea',
    city: 'Seoul',
    country: 'International',
    description: 'Sự pha trộn năng động giữa văn hóa K-pop trẻ trung và những cung điện hoàng gia trang nghiêm.',
    rating: 4.7,
    lat: 37.5665,
    lng: 126.9780,
    tags: ['#seoul', '#kpop', '#streetfood'],
    whyVisit: ['Thăm cung điện Gyeongbokgung', 'Mua sắm tại khu Myeongdong', 'Ngắm thành phố từ tháp N Seoul']
  },
  {
    id: 'int-5',
    name: 'New York',
    location: 'New York, USA',
    city: 'NYC',
    country: 'International',
    description: 'Thành phố không bao giờ ngủ, trung tâm tài chính và biểu tượng của sự tự do hiện đại.',
    rating: 4.6,
    lat: 40.7128,
    lng: -74.0060,
    tags: ['#nyc', '#cityview', '#timesquare'],
    whyVisit: ['Check-in tượng Nữ thần Tự do', 'Dạo công viên Central Park', 'Xem kịch tại Broadway']
  },
  {
    id: 'int-6',
    name: 'Bangkok',
    location: 'Bangkok, Thailand',
    city: 'Bangkok',
    country: 'International',
    description: 'Thiên đường mua sắm và ẩm thực đường phố với những ngôi chùa vàng rực rỡ và nhịp sống về đêm sôi động.',
    rating: 4.5,
    lat: 13.7563,
    lng: 100.5018,
    tags: ['#bangkok', '#foodie', '#shopping'],
    whyVisit: ['Thăm Hoàng cung Thái Lan', 'Mua sắm tại chợ Chatuchak', 'Thưởng thức Pad Thai ven đường']
  },
  {
    id: 'int-7',
    name: 'Rome',
    location: 'Rome, Italy',
    city: 'Rome',
    country: 'International',
    description: 'Bảo tàng ngoài trời vĩ đại, nơi lưu giữ những tàn tích của đế chế La Mã huy hoàng một thời.',
    rating: 4.8,
    lat: 41.9028,
    lng: 12.4964,
    tags: ['#rome', '#history', '#pasta'],
    whyVisit: ['Thăm Đấu trường La Mã Colosseum', 'Tung đồng xu ước nguyện tại đài phun nước Trevi', 'Khám phá Tòa thánh Vatican']
  },
  {
    id: 'int-8',
    name: 'Sydney',
    location: 'Sydney, Australia',
    city: 'Sydney',
    country: 'International',
    description: 'Thành phố cảng quyến rũ với nhà hát Opera hình cánh buồm và những bãi biển lướt sóng nổi tiếng.',
    rating: 4.7,
    lat: -33.8688,
    lng: 151.2093,
    tags: ['#sydney', '#opera', '#harbour'],
    whyVisit: ['Check-in nhà hát Opera Sydney', 'Đi dạo cầu cảng Harbour Bridge', 'Tắm biển Bondi']
  },
  {
    id: 'int-9',
    name: 'Singapore',
    location: 'Singapore',
    city: 'Singapore',
    country: 'International',
    description: 'Quốc đảo sư tử xanh - sạch - đẹp nhất thế giới với kiến trúc tương lai và sự đa dạng văn hóa.',
    rating: 4.8,
    lat: 1.3521,
    lng: 103.8198,
    tags: ['#singapore', '#garden', '#marinabay'],
    whyVisit: ['Ngắm Garden by the Bay', 'Vui chơi tại hòn đảo Sentosa', 'Mua sắm tại đại lộ Orchard']
  },
  {
    id: 'int-10',
    name: 'Seoul',
    location: 'Seoul, South Korea',
    city: 'Seoul',
    country: 'International',
    description: 'Nơi giao thoa giữa ánh đèn neon hiện đại và những ngôi làng Hanok cổ xưa trầm mặc.',
    rating: 4.7,
    lat: 37.5665,
    lng: 126.9780,
    tags: ['#seoul', '#travel', '#lifestyle'],
    whyVisit: ['Khám phá Bukchon Hanok', 'Check-in thư viện Starfield', 'Thưởng thức BBQ Hàn Quốc']
  }
];
