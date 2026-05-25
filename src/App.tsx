import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Search, 
  FileText, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  Menu, 
  X, 
  Eye, 
  EyeOff, 
  Printer, 
  RefreshCw, 
  Clock, 
  Info,
  Check,
  AlertTriangle,
  LogOut,
  ChevronRight,
  User,
  Trash2,
  BookmarkCheck
} from 'lucide-react';
import { Registration, ToastMessage } from './types';

// Exact same mock DB from the attached original index.html file
const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'LTV-2026-00041',
    studentName: 'Nguyễn Minh Khang',
    studentDob: '2020-05-15',
    studentGender: 'Nam',
    studentSchool: 'Mầm non Vành Khuyên',
    studentArea: 'Thôn Đắk Sơn',
    studentPob: 'Lâm Đồng',
    parentName: 'Nguyễn Văn Hải',
    parentRelation: 'Bố',
    parentPhone: '0945044132',
    parentEmail: 'nguyenvanhai@gmail.com',
    parentAddress: 'Số nhà 45, Thôn Đắk Sơn, Huyện Đắk Song, Tỉnh Lâm Đồng',
    status: 'Đã phê duyệt',
    submittedAt: '2026-05-20 09:30',
    birthCert: 'Có',
    preschoolCert: 'Có',
    vaccine: 'Có'
  },
  {
    id: 'LTV-2026-00084',
    studentName: "H'Doan Kpơr",
    studentDob: '2020-11-20',
    studentGender: 'Nữ',
    studentSchool: 'Mầm non Hoạ My',
    studentArea: 'Bon buJy',
    studentPob: 'Đắk Nông',
    parentName: 'Y-Huân Kpơr',
    parentRelation: 'Mẹ',
    parentPhone: '0976217079',
    parentEmail: 'yhuankpor@gmail.com',
    parentAddress: 'Bon buJy, Huyện Đắk Song, Tỉnh Lâm Đồng',
    status: 'Cần bổ sung hồ sơ',
    submittedAt: '2026-05-22 14:15',
    birthCert: 'Có',
    preschoolCert: 'Không có (Nộp sau)',
    vaccine: 'Không có (Nộp sau)'
  }
];

export default function App() {
  // Database State
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Wizard state steps: 1, 2, 3
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Field states
  const [studentName, setStudentName] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [studentGender, setStudentGender] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [studentArea, setStudentArea] = useState('');
  const [studentPob, setStudentPob] = useState('');

  // Documents
  const [docBirthCert, setDocBirthCert] = useState('Có');
  const [docPreschoolCert, setDocPreschoolCert] = useState('Có');
  const [docVaccine, setDocVaccine] = useState('Có');

  // Parents
  const [parentName, setParentName] = useState('');
  const [parentRelation, setParentRelation] = useState('Bố');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentAddress, setParentAddress] = useState('');
  const [confirmDeclaration, setConfirmDeclaration] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedRecords, setSearchedRecords] = useState<Registration[] | null>(null);

  // Admin and Visibility Control States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminPanelVisible, setAdminPanelVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Mobile navigation, Success and UI helpers
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [successData, setSuccessData] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Navigation handler to smoothly scroll
  const handleNavClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    setMobileMenuOpen(false);
  };

  // Countdown clock state
  const [countdown, setCountdown] = useState({
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
    isClosed: false
  });

  // Load and setup initial data and countdowns
  useEffect(() => {
    // Registrations storage
    const stored = localStorage.getItem('ltv_registrations');
    if (stored) {
      try {
        setRegistrations(JSON.parse(stored));
      } catch (e) {
        setRegistrations(INITIAL_REGISTRATIONS);
        localStorage.setItem('ltv_registrations', JSON.stringify(INITIAL_REGISTRATIONS));
      }
    } else {
      setRegistrations(INITIAL_REGISTRATIONS);
      localStorage.setItem('ltv_registrations', JSON.stringify(INITIAL_REGISTRATIONS));
    }

    // Session check for Admin (Exact same 8-hour session logic as the template)
    const expiry = localStorage.getItem('ltv_admin_session_expiry');
    if (expiry && Date.now() < parseInt(expiry, 10)) {
      setIsAdminLoggedIn(true);
      setAdminPanelVisible(true);
    } else {
      localStorage.removeItem('ltv_admin_session_expiry');
    }

    // Countdown target: June 24, 2026, 17:00:00 (Vietnam local or server-relative)
    const targetDate = new Date('2026-06-24T17:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isClosed: true
        });
        clearInterval(interval);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({
          days: d < 10 ? '0' + d : d.toString(),
          hours: h < 10 ? '0' + h : h.toString(),
          minutes: m < 10 ? '0' + m : m.toString(),
          seconds: s < 10 ? '0' + s : s.toString(),
          isClosed: false
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Show customized floating toast helper
  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type, id: Math.random().toString() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Admin login actions
  const handleAdminToggle = () => {
    if (isAdminLoggedIn) {
      setAdminPanelVisible(!adminPanelVisible);
      triggerToast('Đã ' + (adminPanelVisible ? 'ẩn' : 'mở') + ' biểu đồ thẩm định danh sách tuyển sinh.', 'success');
    } else {
      setAdminPassword('');
      setLoginError(false);
      setShowAdminLoginModal(true);
    }
  };

  const executeAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'LTV@2026') {
      const sessionExpiry = Date.now() + 8 * 60 * 60 * 1000; // 8 Hours
      localStorage.setItem('ltv_admin_session_expiry', sessionExpiry.toString());
      setIsAdminLoggedIn(true);
      setAdminPanelVisible(true);
      setShowAdminLoginModal(false);
      setLoginError(false);
      triggerToast('Đăng nhập ban tuyển sinh thành công! Phiên của bạn có hiệu lực 8 tiếng.', 'success');
      setTimeout(() => {
        document.getElementById('admin-panel')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setLoginError(true);
      triggerToast('Mật khẩu kiểm tra không hợp lệ!', 'error');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('ltv_admin_session_expiry');
    setIsAdminLoggedIn(false);
    setAdminPanelVisible(false);
    triggerToast('Đã đăng xuất khỏi phiên làm việc cán bộ an toàn.', 'success');
  };

  const resetAllDatabase = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục dữ liệu mẫu ban đầu của trường?')) {
      localStorage.setItem('ltv_registrations', JSON.stringify(INITIAL_REGISTRATIONS));
      setRegistrations(INITIAL_REGISTRATIONS);
      triggerToast('Khôi phục danh sách học sinh mẫu thành công!', 'success');
    }
  };

  // Change individual student application status (Approved / Correction input)
  const changeStudentStatus = (id: string, newStatus: 'Đã phê duyệt' | 'Cần bổ sung hồ sơ') => {
    const updated = registrations.map(reg => {
      if (reg.id === id) {
        return { ...reg, status: newStatus };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('ltv_registrations', JSON.stringify(updated));
    triggerToast(`Đã cập nhật trạng thái hồ sơ ${id} sang: ${newStatus}`, 'success');

    // Update current active matched lookups if visible
    if (searchedRecords) {
      const refreshedSearch = searchedRecords.map(reg => {
        if (reg.id === id) {
          return { ...reg, status: newStatus };
        }
        return reg;
      });
      setSearchedRecords(refreshedSearch);
    }
  };

  // Student details validation before moving to step 2 in candidate wizard
  const validateAndGoToStep2 = () => {
    if (!studentName.trim() || !studentSchool || !studentArea || !studentPob.trim() || !studentDob) {
      triggerToast('Vui lòng hoàn thành đầy đủ thông tin cá nhân bắt buộc của học sinh!', 'error');
      return;
    }
    setCurrentStep(2);
    document.getElementById('dang-ky-tuyen-sinh')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Step 2 approval before step 3
  const validateAndGoToStep3 = () => {
    setCurrentStep(3);
    document.getElementById('dang-ky-tuyen-sinh')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Complete submission to google sheet and local state
  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !parentPhone.trim() || !parentAddress.trim() || !confirmDeclaration) {
      triggerToast('Vui lòng điền thông tin phụ huynh và tích chọn cam đoan danh tính!', 'error');
      return;
    }

    setLoading(true);
    triggerToast('Đang kết nối & gửi hồ sơ lên Google Sheet...', 'success');

    // Build the data container
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `LTV-2026-000${randomCode}`;
    const submissionTime = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newSubmission: Registration = {
      id: generatedId,
      studentName,
      studentDob,
      studentGender,
      studentSchool,
      studentArea,
      studentPob,
      birthCert: docBirthCert,
      preschoolCert: docPreschoolCert,
      vaccine: docVaccine,
      parentName,
      parentRelation,
      parentPhone,
      parentEmail: parentEmail || undefined,
      parentAddress,
      status: 'Chờ xét duyệt',
      submittedAt: submissionTime
    };

    // Use absolute URL from template for sending data
    const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwr5gV-yA-UXzvpAOzVvh4TnLTEzsx0a1cBWi0yhlEFgzFZZbUw42mRB7zBCbrR9wmc4w/exec";

    fetch(GOOGLE_SHEET_API_URL, {
      method: "POST",
      mode: "no-cors", // Same CORS escape bypass constraint
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSubmission)
    })
    .then(() => {
      // Local addition fallback and backup
      const updatedList = [...registrations, newSubmission];
      setRegistrations(updatedList);
      localStorage.setItem('ltv_registrations', JSON.stringify(updatedList));

      setSuccessData(newSubmission);
      triggerToast('Hồ sơ của bé đã lưu thành công vào Google Sheet!', 'success');
    })
    .catch((error) => {
      console.error("Lỗi Google Sheet API:", error);
      // Fallback local backup persistence
      const updatedList = [...registrations, newSubmission];
      setRegistrations(updatedList);
      localStorage.setItem('ltv_registrations', JSON.stringify(updatedList));

      setSuccessData(newSubmission);
      triggerToast('Lưu nội bộ thành công (Cổng Google Sheet đang nghẽn)!', 'error');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  // Clear form fields for new candidate registration
  const resetEnrollmentForm = () => {
    setStudentName('');
    setStudentDob('2020-05-15');
    setStudentGender('Nam');
    setStudentSchool('');
    setStudentArea('');
    setStudentPob('');
    setDocBirthCert('Có');
    setDocPreschoolCert('Có');
    setDocVaccine('Có');
    setParentName('');
    setParentRelation('Bố');
    setParentPhone('');
    setParentEmail('');
    setParentAddress('');
    setConfirmDeclaration(false);
    setSuccessData(null);
    setCurrentStep(1);
    triggerToast('Đã bắt đầu điền hồ sơ đăng ký mới.', 'success');
  };

  // Dynamic Lookup Action
  const performLookupQuery = () => {
    if (!searchQuery.trim()) {
      triggerToast('Hãy nhập Số điện thoại hoặc Mã hồ sơ để tra cứu!', 'error');
      return;
    }

    const matched = registrations.filter(item => 
      item.id.toLowerCase() === searchQuery.trim().toLowerCase() || 
      item.parentPhone === searchQuery.trim() || 
      item.studentName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    setSearchedRecords(matched);
  };

  // Direct preparation file (.txt format) downloader standard
  const downloadSampleApplicationForm = () => {
    const defaultText = `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nĐƠN XIN VÀO HỌC LỚP 1\nNăm học 2026 - 2027\n\nKính gửi: Ban Giám hiệu Trường Tiểu học Lương Thế Vinh - Đắk Song\n\nHọ và tên tôi là: ........................................................................\nLà cha/mẹ (hoặc người giám hộ hợp pháp) của học sinh: ............................\nSinh ngày: ...../...../2020. Giới tính: ............\nNơi sinh: ........................... Thường trú tại Thôn: ...............................\nĐã hoàn thành chương trình mẫu giáo 5 tuổi tại Trường Mầm non: ................\n\nKính mong Ban Giám hiệu xem xét tiếp nhận con tôi vào học lớp 1.\n\nĐắk Song, ngày ..... tháng ..... năm 2026\nNgười làm đơn (ký và ghi rõ họ tên)`;
    const blob = new Blob([defaultText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mau_Don_Xin_Nhap_Hoc_LTV_2026_2027.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    triggerToast('Đã tải mẫu đơn xin học về máy!', 'success');
  };

  // Statistics Computations
  const totalSubmissions = registrations.length;
  const pendingSubmissions = registrations.filter(item => item.status === 'Chờ xét duyệt').length;
  const progressPercent = Math.min(100, Math.round((totalSubmissions / 120) * 100));

  return (
    <div className="bg-slate-50 text-slate-800 flex flex-col min-h-screen">
      
      {/* Toast Notification */}
      {toast && (
        <div 
          id="custom-toast" 
          className="fixed bottom-6 right-4 left-4 lg:left-auto lg:right-6 z-[120] transform translate-y-0 opacity-100 transition-all duration-300 pointer-events-auto max-w-sm"
        >
          <div className={`p-4 rounded-2xl shadow-xl flex items-start gap-3 border ${
            toast.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            {toast.type === 'error' ? (
              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs sm:text-sm font-semibold">
              {toast.text}
            </div>
          </div>
        </div>
      )}

      {/* SECURE PASSWORD LOGIN POPUP (MODAL) */}
      {showAdminLoginModal && (
        <div id="admin-login-modal" className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative transform transition-all duration-300 scale-100">
            {/* Close Modal */}
            <button 
              onClick={() => setShowAdminLoginModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-header text-xl sm:text-2xl font-black text-slate-900">Ban Tuyển Sinh Đăng Nhập</h3>
              <p className="text-xs sm:text-sm text-slate-500">Mật khẩu bảo mật được cung cấp bởi Ban giám hiệu nhà trường.</p>
            </div>

            {/* Login Input Form */}
            <form onSubmit={executeAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                  Mật khẩu truy cập <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required 
                    placeholder="Nhập mật khẩu kiểm duyệt (Mẫu: LTV@2026)..." 
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base outline-none transition-all min-h-[46px]"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 min-w-[32px] min-h-[32px] flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginError && (
                  <span id="login-error-msg" className="text-xs font-medium text-rose-500 mt-1.5 block">
                    Mật khẩu không chính xác, vui lòng thử lại!
                  </span>
                )}
              </div>

              <div className="text-[10px] text-slate-400 leading-normal flex items-start gap-1.5 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Lưu ý bảo mật:</strong> Phiên làm việc kéo dài <strong>8 tiếng</strong>. Bạn sẽ tự động đăng xuất sau thời gian này để đảm bảo an toàn thông tin trẻ.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAdminLoginModal(false)} 
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 rounded-xl bg-white hover:bg-slate-50 transition-all min-h-[44px]"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-100 min-h-[44px]"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & School Name */}
            <div className="flex items-center space-x-2.5">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 relative overflow-hidden shrink-0">
                <span className="absolute top-0 left-0 w-full h-1.5 bg-orange-500"></span>
                <span className="font-header font-extrabold text-base tracking-wider pt-0.5">LTV</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600 block leading-tight">Trường Tiểu Học</span>
                <h1 className="text-sm sm:text-base font-extrabold text-blue-900 leading-none">Lương Thế Vinh - Đắk Song</h1>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1.5">
              {/* CTA Button */}
              <a 
                href="#dang-ky-tuyen-sinh" 
                onClick={(e) => handleNavClick('dang-ky-tuyen-sinh', e)}
                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all rounded-xl shadow-md shadow-orange-100"
              >
                Nộp Hồ Sơ
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Banner-Style Hero Section */}
      <section id="trang-chu" className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 text-white py-12 sm:py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        
        {/* Subtle Orange Wave separator to match the graphic background curve */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-orange-500 transform translate-y-1"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Text Content based on Banner Header */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-500 text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                NĂM HỌC 2026 - 2027
              </div>
              
              <h2 className="font-header text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
                Trường TH Lương Thế Vinh <br className="hidden sm:inline" />
                <span className="text-amber-300">tuyển sinh trẻ vào lớp 1</span>
              </h2>
              
              <p className="text-xs sm:text-base text-blue-100 max-w-xl mx-auto lg:mx-0 font-medium">
                Chào mừng Quý phụ huynh đăng ký trực tuyến con em thuộc địa bàn Đắk Song vào Trường Tiểu học Lương Thế Vinh. Thực hiện công tác chuyển đổi số tuyển sinh nhanh chóng, an toàn và thuận tiện.
              </p>

              {/* Banner official website badge */}
              <div className="inline-flex flex-wrap items-center gap-2.5 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-xs text-left max-w-lg mx-auto lg:mx-0">
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-slate-300 font-semibold uppercase tracking-wider text-[8px]">Cổng Tuyển Sinh Trực Tuyến Duy Nhất</span>
                  <a href="http://daksong.lamdong.vn/luongthevinh" target="_blank" rel="noreferrer" className="font-bold text-white hover:underline text-xs sm:text-sm block truncate">
                    daksong.lamdong.vn/luongthevinh
                  </a>
                </div>
              </div>
            </div>

            {/* Live Countdown & Action Center */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white text-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-100 space-y-4 sm:space-y-5 relative">
                {/* Top Orange Highlight Ribbon */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-t-3xl"></div>
                
                <div className="text-center">
                  <span className="text-base sm:text-lg font-black uppercase tracking-wide text-orange-600 block">Hình thức đăng ký Online</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">Hạn Cuối: 24/06/2026</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">(Hệ thống tự động đóng cổng sau thời gian này)</p>
                </div>

                {/* Countdown Clock UI */}
                <div id="countdown-timer" className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="bg-orange-50/70 py-2.5 px-1 rounded-xl border border-orange-100/50">
                    <span id="days" className="block text-xl sm:text-3xl font-black text-orange-600 font-header">{countdown.days}</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mt-0.5 block">Ngày</span>
                  </div>
                  <div className="bg-orange-50/70 py-2.5 px-1 rounded-xl border border-orange-100/50">
                    <span id="hours" className="block text-xl sm:text-3xl font-black text-orange-600 font-header">{countdown.hours}</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mt-0.5 block">Giờ</span>
                  </div>
                  <div className="bg-orange-50/70 py-2.5 px-1 rounded-xl border border-orange-100/50">
                    <span id="minutes" className="block text-xl sm:text-3xl font-black text-orange-600 font-header">{countdown.minutes}</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mt-0.5 block">Phút</span>
                  </div>
                  <div className="bg-orange-50/70 py-2.5 px-1 rounded-xl border border-orange-100/50">
                    <span id="seconds" className="block text-xl sm:text-3xl font-black text-orange-600 font-header">{countdown.seconds}</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-slate-500 tracking-wider mt-0.5 block">Giây</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[11px] sm:text-xs">Trạng thái cổng trực tuyến:</span>
                    {countdown.isClosed ? (
                      <span id="admission-status-badge" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Đã đóng cổng trực tuyến</span>
                    ) : (
                      <span id="admission-status-badge" className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Đang nhận hồ sơ</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[11px] sm:text-xs">Tuyển sinh trực tiếp tại trường:</span>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg text-[11px]">25/06 - 30/06/2026</span>
                  </div>
                </div>

                <a 
                  href="#dang-ky-tuyen-sinh" 
                  className="w-full inline-flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-200 transition-all text-center min-h-[44px]"
                >
                  Đăng ký nhập học trực tuyến
                </a>

                {/* Nộp hồ sơ trực tiếp Block */}
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/60 text-slate-800 space-y-1.5 text-left shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                    <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-700">Hình thức nộp hồ sơ trực tiếp</h4>
                  </div>
                  <p className="text-sm font-black text-slate-900">Từ ngày 25/06 đến hết 30/06/2026</p>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium">
                    Nộp đối chiếu hồ sơ trực tiếp vào buổi sáng các ngày trong tuần tại 2 điểm trường do ban tuyển sinh tiếp nhận.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="dang-ky-tuyen-sinh" className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600">ĐĂNG KÝ ONLINE 24/7</span>
            <h3 className="font-header text-2xl sm:text-4xl font-extrabold text-blue-900">Cổng Tiếp Nhận Hồ Sơ Trực Tuyến</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">Vui lòng hoàn thành các bước sau để cập nhật hồ sơ đăng ký lớp 1.</p>
          </div>

          {/* Wizard Card Container */}
          <div className="bg-slate-50 rounded-3xl p-4 sm:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/20">
              
            {/* MOBILE Progress Tracker */}
            <div className="lg:hidden mb-6 bg-white p-3.5 rounded-2xl border border-slate-200/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-orange-600 uppercase tracking-wider text-xs" id="mobile-step-title">
                  {currentStep === 1 && "Bước 1: Lý lịch học sinh"}
                  {currentStep === 2 && "Bước 2: Xác nhận loại hồ sơ"}
                  {currentStep === 3 && "Bước 3: Thông tin Phụ huynh"}
                </span>
                <span className="font-extrabold text-slate-500 text-xs" id="mobile-step-counter">
                  {currentStep} / 3
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  id="mobile-step-progressbar" 
                  className="bg-orange-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* DESKTOP Navigation steps */}
            <div className="hidden lg:flex items-center justify-between mb-8 border-b border-slate-200 pb-5 overflow-x-auto whitespace-nowrap">
              <button 
                type="button"
                onClick={() => currentStep > 1 && setCurrentStep(1)}
                className={`flex items-center gap-2 font-bold text-sm shrink-0 pb-2 ${
                  currentStep === 1 ? 'text-orange-600 border-b-2 border-orange-600' : 'text-emerald-600'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold leading-none ${
                  currentStep === 1 ? 'bg-orange-600 text-white' : 'bg-emerald-500 text-white'
                }`}>
                  {currentStep > 1 ? '✓' : '1'}
                </span>
                <span>Lý lịch học sinh</span>
              </button>
              <div className="h-px w-6 bg-slate-300 shrink-0"></div>
              
              <button 
                type="button"
                onClick={() => currentStep > 2 && setCurrentStep(2)}
                className={`flex items-center gap-2 font-bold text-sm shrink-0 pb-2 ${
                  currentStep === 2 ? 'text-orange-600 border-b-2 border-orange-600' : currentStep > 2 ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold leading-none ${
                  currentStep === 2 ? 'bg-orange-600 text-white' : currentStep > 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {currentStep > 2 ? '✓' : '2'}
                </span>
                <span>Xác nhận loại hồ sơ</span>
              </button>
              <div className="h-px w-6 bg-slate-300 shrink-0"></div>

              <div 
                className={`flex items-center gap-2 font-bold text-sm shrink-0 pb-2 ${
                  currentStep === 3 ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-400'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold leading-none ${
                  currentStep === 3 ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </span>
                <span>Thông tin Phụ huynh</span>
              </div>
            </div>

            {/* Registration Form */}
            {!successData ? (
              <form onSubmit={handleEnrollmentSubmit} className="space-y-6">
                
                {/* STEP 1: Student Details */}
                {currentStep === 1 && (
                  <div id="form-step-1" className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">Thông tin cá nhân của Học sinh</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-400">Vui lòng khai báo chính xác đúng theo thông tin Giấy khai sinh</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Họ và tên học sinh <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          required 
                          placeholder="" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>

                      {/* DOB */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Ngày tháng năm sinh <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="date" 
                          value={studentDob}
                          onChange={(e) => setStudentDob(e.target.value)}
                          required 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Giới tính <span className="text-rose-500">*</span>
                        </label>
                        <select 
                          value={studentGender}
                          onChange={(e) => setStudentGender(e.target.value)}
                          required 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]"
                        >
                          <option value="">-- Chọn giới tính --</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>

                      {/* Former Preschool */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Học mầm non tại trường <span className="text-rose-500">*</span>
                        </label>
                        <select 
                          value={studentSchool}
                          onChange={(e) => setStudentSchool(e.target.value)}
                          required 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]"
                        >
                          <option value="" disabled>Chọn trường mầm non đã theo học</option>
                          <option value="Mầm non Vành Khuyên">Mầm non Vành Khuyên (Chỉ tiêu: 57)</option>
                          <option value="Mầm non Hoạ My">Mầm non Hoạ My (Chỉ tiêu: 63)</option>
                          <option value="Mẫu giáo khác">Trường mẫu giáo khác / Chưa đi học</option>
                        </select>
                      </div>

                      {/* Native Area */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Thôn cư trú địa bàn <span className="text-rose-500">*</span>
                        </label>
                        <select 
                          value={studentArea}
                          onChange={(e) => setStudentArea(e.target.value)}
                          required 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]"
                        >
                          <option value="" disabled>Chọn thôn/bản cư trú</option>
                          <option value="Thôn Đắk Sơn">Thôn Đắk Sơn</option>
                          <option value="Bon buJy">Bon buJy</option>
                          <option value="Thôn Hà Nam Ninh">Thôn Hà Nam Ninh</option>
                          <option value="Thôn Tân Bình">Thôn Tân Bình</option>
                          <option value="Thôn Rừng Lạnh">Thôn Rừng Lạnh</option>
                          <option value="Nơi khác (ngoài địa bàn)">Nơi khác (ngoài địa bàn quy định)</option>
                        </select>
                      </div>

                      {/* POB */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Nơi sinh (Tỉnh / Thành phố) <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={studentPob}
                          onChange={(e) => setStudentPob(e.target.value)}
                          placeholder="Ví dụ: Lâm Đồng" 
                          required 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200/60">
                      <button 
                        type="button" 
                        onClick={validateAndGoToStep2}
                        className="w-full sm:w-auto px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-1.5 shadow-md min-h-[44px]"
                      >
                        Tiếp tục bước kế tiếp
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Document checklist states */}
                {currentStep === 2 && (
                  <div id="form-step-2" className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">Xác nhận tình trạng hồ sơ mang theo</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-400">Vui lòng tích chọn tình trạng chuẩn bị giấy tờ của con em</p>
                    </div>

                    <div className="space-y-3.5">
                      {/* Box 1: Giấy khai sinh */}
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-900">1. Bản sao Giấy khai sinh hợp lệ <span className="text-rose-500">*</span></span>
                            <p className="text-[11px] text-slate-500">Bản sao trích lục từ sổ gốc hoặc bản sao có chứng thực</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <label className="relative flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-all select-none">
                            <input 
                              type="radio" 
                              name="doc-birth-cert" 
                              value="Có" 
                              checked={docBirthCert === 'Có'}
                              onChange={() => setDocBirthCert('Có')}
                              className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500" 
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Đã chuẩn bị sẵn (Có)</span>
                          </label>
                          <label className="relative flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-all select-none">
                            <input 
                              type="radio" 
                              name="doc-birth-cert" 
                              value="Không có (Nộp sau)" 
                              checked={docBirthCert !== 'Có'}
                              onChange={() => setDocBirthCert('Không có (Nộp sau)')}
                              className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500" 
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Không có (sẽ nộp sau ngày 25 đến 30/6/2026)</span>
                          </label>
                        </div>
                      </div>

                      {/* Box 2: Giấy chứng nhận hoàn thành mầm non */}
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-900">2. Giấy chứng nhận hoàn thành chương trình Mầm non <span className="text-rose-500">*</span></span>
                            <p className="text-[11px] text-slate-500">Chứng nhận hoàn thành chương trình mẫu giáo 5 tuổi</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <label className="relative flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-all select-none">
                            <input 
                              type="radio" 
                              name="doc-preschool-cert" 
                              value="Có" 
                              checked={docPreschoolCert === 'Có'}
                              onChange={() => setDocPreschoolCert('Có')}
                              className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500" 
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Đã chuẩn bị sẵn (Có)</span>
                          </label>
                          <label className="relative flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-all select-none">
                            <input 
                              type="radio" 
                              name="doc-preschool-cert" 
                              value="Không có (Nộp sau)" 
                              checked={docPreschoolCert !== 'Có'}
                              onChange={() => setDocPreschoolCert('Không có (Nộp sau)')}
                              className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500" 
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Không có (sẽ nộp sau ngày 25 đến 30/6/2026)</span>
                          </label>
                        </div>
                      </div>

                      {/* Box 3: Sổ tiêm chủng photo */}
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm font-sans">
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-slate-900">3. Sổ tiêm chủng bản photo <span className="text-rose-500">*</span></span>
                            <p className="text-[11px] text-slate-500">Các trang lưu lịch sử tiêm phòng của học sinh</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <label className="relative flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-all select-none">
                            <input 
                              type="radio" 
                              name="doc-vaccine" 
                              value="Có" 
                              checked={docVaccine === 'Có'}
                              onChange={() => setDocVaccine('Có')}
                              className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500" 
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Đã chuẩn bị sẵn (Có)</span>
                          </label>
                          <label className="relative flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-all select-none">
                            <input 
                              type="radio" 
                              name="doc-vaccine" 
                              value="Không có (Nộp sau)" 
                              checked={docVaccine !== 'Có'}
                              onChange={() => setDocVaccine('Không có (Nộp sau)')}
                              className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500" 
                            />
                            <span className="text-xs sm:text-sm font-semibold text-slate-700">Không có (sẽ nộp sau ngày 25 đến 30/6/2026)</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Back & Next step navigation */}
                    <div className="flex flex-col-reverse sm:flex-row justify-between gap-2.5 pt-4 border-t border-slate-200/60">
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(1)} 
                        className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1 transition-all min-h-[44px]"
                      >
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                        Quay lại Bước 1
                      </button>
                      <button 
                        type="button" 
                        onClick={validateAndGoToStep3}
                        className="w-full sm:w-auto px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-1.5 shadow-md min-h-[44px]"
                      >
                        Tiếp tục bước kế tiếp
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Parent/Guardian Info */}
                {currentStep === 3 && (
                  <div id="form-step-3" className="space-y-4">
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">Thông tin Cha/Mẹ/Người giám hộ liên hệ</h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-400">Thông tin liên lạc để Ban tuyển sinh đối chứng và gửi thông báo kết quả</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Họ tên người đăng ký <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          required 
                          placeholder="Ví dụ: Nguyễn Văn Hải" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>

                      {/* Relation */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Mối quan hệ với học sinh <span className="text-rose-500">*</span>
                        </label>
                        <select 
                          value={parentRelation}
                          onChange={(e) => setParentRelation(e.target.value)}
                          required 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]"
                        >
                          <option value="Bố">Bố đẻ</option>
                          <option value="Mẹ">Mẹ đẻ</option>
                          <option value="Người giám hộ">Người giám hộ hợp pháp</option>
                        </select>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Số điện thoại liên hệ <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          required 
                          placeholder="Ví dụ: 0945044132" 
                          pattern="[0-9]{10}" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Email cá nhân (Nếu có)
                        </label>
                        <input 
                          type="email" 
                          value={parentEmail}
                          onChange={(e) => setParentEmail(e.target.value)}
                          placeholder="Ví dụ: hotro.tuyensinh@gmail.com" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>

                      {/* Resident Address */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                          Địa chỉ thường trú / cư trú chi tiết <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={parentAddress}
                          onChange={(e) => setParentAddress(e.target.value)}
                          required 
                          placeholder="Số nhà 45, Thôn Đắk Sơn, Huyện Đắk Song, Tỉnh Lâm Đồng" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base sm:text-sm outline-none transition-all min-h-[46px]" 
                        />
                      </div>
                    </div>

                    {/* Legal Declaration Checkbox */}
                    <div className="p-3.5 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-start gap-2.5">
                      <input 
                        type="checkbox" 
                        id="confirm-declaration" 
                        checked={confirmDeclaration}
                        onChange={(e) => setConfirmDeclaration(e.target.checked)}
                        required 
                        className="w-5 h-5 accent-orange-600 text-orange-600 focus:ring-orange-500 shrink-0 mt-0.5 rounded-lg" 
                      />
                      <label htmlFor="confirm-declaration" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                        Tôi cam đoan các thông tin đã khai báo trên đây hoàn toàn chính xác theo hồ sơ gốc của học sinh. Tôi hoàn toàn chịu mọi trách nhiệm trước pháp luật.
                      </label>
                    </div>

                    {/* Navigation final actions with loading state support */}
                    <div className="flex flex-col-reverse sm:flex-row justify-between gap-2.5 pt-4 border-t border-slate-200/60">
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(2)} 
                        className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-1 transition-all min-h-[44px]"
                      >
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                        Quay lại Bước 2
                      </button>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-100 min-h-[44px]"
                      >
                        {loading ? (
                          <span className="inline-flex items-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                            Đang nộp hồ sơ...
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <Check className="w-4 h-4 shrink-0" />
                            Gửi Hồ Sơ Dự Tuyển
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            ) : (
              /* SUCCESS SCREEN WITH RECEIPT */
              <div id="registration-success" className="text-center space-y-6 py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-600 block">Tuyển sinh trực tuyến lớp 1</span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">Gửi hồ sơ thành công!</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">Vui lòng chụp màn hình hoặc lưu lại các thông tin nhận hồ sơ của bé dưới đây để tra cứu.</p>
                </div>

                {/* Receipt Detail Container */}
                <div className="max-w-md mx-auto bg-white p-4.5 sm:p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-400 uppercase text-[8px] sm:text-[9px]">Mã biên nhận hồ sơ</span>
                    <span id="receipt-id" className="font-extrabold text-blue-600">{successData.id}</span>
                  </div>
                  <div className="space-y-1.5 text-slate-600 text-[11px] sm:text-xs">
                    <p><span className="font-semibold text-slate-900">Học sinh:</span> <span>{successData.studentName}</span></p>
                    <p><span className="font-semibold text-slate-900">Địa bàn thôn:</span> <span>{successData.studentArea}</span></p>
                    <p><span className="font-semibold text-slate-900">Trường mầm non đã theo học:</span> <span>{successData.studentSchool}</span></p>
                    <p><span className="font-semibold text-slate-900">Số điện thoại liên hệ:</span> <span>{successData.parentPhone}</span></p>
                    <p className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-900">Trạng thái:</span> 
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9px] border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        Đã lưu trữ Google Sheet
                      </span>
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-slate-100 text-center">
                    <button 
                      onClick={() => window.print()} 
                      className="text-[10px] font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1 mx-auto min-h-[32px]"
                    >
                      <Printer className="w-3.5 h-3.5 mr-1" />
                      In phiếu biên nhận này
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={resetEnrollmentForm} 
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-all min-h-[40px]"
                  >
                    Tạo thêm hồ sơ tuyển sinh mới
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>





      {/* Support Hotline & School Addresses */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/60 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
            {/* Contact hotlines */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 block">Ban Chỉ Đạo Tuyển Sinh</span>
              <h3 className="font-header text-2xl sm:text-3xl font-extrabold text-blue-900">Thông Tin Liên Hệ Hotline</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Khi gặp bất cứ khó khăn hay vướng mắc nào trong quá trình làm hồ sơ tuyển sinh trực tiếp hay trực tuyến, phụ huynh vui lòng liên hệ trực tiếp cho cán bộ hỗ trợ:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Contact 1 */}
                <div className="p-4 bg-orange-50/40 border border-orange-100 rounded-2xl flex items-center gap-3.5 shadow-sm min-h-[44px]">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold shrink-0">D</div>
                  <div>
                    <span className="block text-slate-500 text-[9px] font-bold uppercase">Phụ trách tư vấn chính</span>
                    <span className="block text-xs sm:text-sm font-extrabold text-slate-950 text-sans">Cô Dinh</span>
                    <a href="tel:0945044132" className="text-xs font-bold text-orange-600 hover:underline">0945.044.132</a>
                  </div>
                </div>

                {/* Contact 2 */}
                <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl flex items-center gap-3.5 shadow-sm min-h-[44px]">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shrink-0">D</div>
                  <div>
                    <span className="block text-slate-500 text-[9px] font-bold uppercase">Giải đáp kỹ thuật cổng</span>
                    <span className="block text-xs sm:text-sm font-extrabold text-slate-950 text-sans">Thầy Duy</span>
                    <a href="tel:0976217079" className="text-xs font-bold text-blue-600 hover:underline">0976.217.079</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations & instruction */}
            <div className="lg:col-span-6 bg-slate-50 p-5 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-header text-base sm:text-lg font-bold text-slate-900">Địa điểm thu hồ sơ trực tiếp</h4>
                <p className="text-[11px] sm:text-xs text-slate-500">Đối với phụ huynh nộp trực tiếp từ 25/06 đến 30/06/2026, vui lòng mang hồ sơ gốc đối chứng tại 2 địa điểm:</p>
              </div>

              <div className="space-y-3 my-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0"></span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Phân hiệu Trung tâm Trường Tiểu học Lương Thế Vinh</p>
                    <p className="text-slate-500 text-[10px] sm:text-[11px] mt-0.5">Tiếp nhận con em thuộc thôn Đắk Sơn, Bon buJy, Tân Bình.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></span>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Phân hiệu Cũ (Điểm trường số 2)</p>
                    <p className="text-slate-500 text-[10px] sm:text-[11px] mt-0.5">Tiếp nhận con em thuộc thôn Hà Nam Ninh, Rừng Lạnh.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-[10px] sm:text-[11px] text-slate-500">
                * Lưu ý khi đối chiếu hồ sơ trực tiếp: Phụ huynh mang theo Đơn đăng ký (theo mẫu trường), Bản sao khai sinh hợp lệ, Giấy CN mầm non 5 tuổi, Sổ tiêm chủng bản photo để nhà trường lưu trữ đối chiếu.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-950 text-slate-400 text-[10px] sm:text-[11px] py-8 border-t border-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <span className="font-header text-xs sm:text-sm font-bold text-white block">Trường Tiểu Học Lương Thế Vinh - Đắk Song</span>
              <p className="mt-1">Địa chỉ chính thức: Đắk Song, Huyện Đắk Song, Tỉnh Lâm Đồng</p>
              <p className="mt-0.5">Website cổng dịch vụ công trực tuyến: <a href="http://daksong.lamdong.vn/luongthevinh" target="_blank" rel="noreferrer" className="text-orange-400 hover:underline">daksong.lamdong.vn/luongthevinh</a></p>
            </div>
            <div className="text-center md:text-right space-y-1">
              <p>&copy; 2026 Trường Tiểu học Lương Thế Vinh. Tất cả quyền được bảo lưu.</p>
              <p className="text-[9px] sm:text-[10px] text-slate-600">Phát triển tuyển sinh bởi Ban chuyển đổi số Trường TH Lương Thế Vinh</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
