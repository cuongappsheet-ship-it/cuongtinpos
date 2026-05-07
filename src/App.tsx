import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Star, GraduationCap } from 'lucide-react';

import { Grade, Subject, Question, questionBank } from './data/questions';
import { playSound } from './lib/sounds';

type AppStage = 'STEP_1_NAME' | 'STEP_2_CLASS' | 'STEP_3_GREETING' | 'SUBJECT_SELECTION' | 'QUIZ' | 'RESULT';

interface UserInfo {
  name: string;
  grade: Grade | '';
  className: string;
}

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>;
  selectedSubject: Subject | null;
}

export default function App() {
  const [stage, setStage] = useState<AppStage>('STEP_1_NAME');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', grade: '', className: '' });
  const [quizState, setQuizState] = useState<QuizState>({ currentQuestionIndex: 0, answers: {}, selectedSubject: null });

  // STEP 1
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.name.trim()) {
      playSound('click');
      setStage('STEP_2_CLASS');
    }
  };

  // STEP 2
  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.grade && userInfo.className.trim()) {
      playSound('click');
      setStage('STEP_3_GREETING');
    }
  };

  // STEP 3
  const handleGreetingNext = () => {
    playSound('click');
    setStage('SUBJECT_SELECTION');
  };

  // SUBJECT SELECTION
  const handleSubjectSelect = (subject: Subject) => {
    playSound('click');
    setQuizState({ currentQuestionIndex: 0, answers: {}, selectedSubject: subject });
    setStage('QUIZ');
  };

  // QUIZ STAGE
  const currentQuestions = (userInfo.grade && quizState.selectedSubject) 
    ? questionBank[userInfo.grade as Grade][quizState.selectedSubject] || []
    : [];
  
  const currentQuestion = currentQuestions[quizState.currentQuestionIndex];

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizState.answers[quizState.currentQuestionIndex] !== undefined) return;
    
    playSound('click');
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [prev.currentQuestionIndex]: optionIndex }
    }));

    if (optionIndex === currentQuestion.correctAnswerIndex) {
      setTimeout(() => playSound('correct'), 100);
    } else {
      setTimeout(() => playSound('wrong'), 100);
    }
  };

  const nextQuestion = () => {
    playSound('click');
    if (quizState.currentQuestionIndex < currentQuestions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    } else {
      setStage('RESULT');
      playSound('cheer');
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  // RESULT STAGE
  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach((q, index) => {
      if (quizState.answers[index] === q.correctAnswerIndex) correct++;
    });
    return Math.round((correct / currentQuestions.length) * 10);
  };

  const getFeedback = (score: number) => {
    if (score >= 9) return "Xuất sắc! Em học rất giỏi!";
    if (score >= 7) return "Rất giỏi! Cố gắng phát huy nhé!";
    if (score >= 5) return "Khá lắm! Em ôn tập thêm sẽ tốt hơn!";
    return "Đừng buồn, hãy ôn bài kỹ hơn và thử lại nhé!";
  };

  const resetAll = () => {
    playSound('click');
    setUserInfo({ name: '', grade: '', className: '' });
    setQuizState({ currentQuestionIndex: 0, answers: {}, selectedSubject: null });
    setStage('STEP_1_NAME');
  };

  const selectAnotherSubject = () => {
    playSound('click');
    setQuizState({ currentQuestionIndex: 0, answers: {}, selectedSubject: null });
    setStage('SUBJECT_SELECTION');
  };

  const isWelcomeStage = ['STEP_1_NAME', 'STEP_2_CLASS', 'STEP_3_GREETING'].includes(stage);

  const getSubjectDescription = (subject: Subject, grade: string) => {
    if (subject === 'Tin học') {
      if (grade === '3') return 'Làm quen với máy tính, tệp tin, thư mục, phần mềm trình chiếu và khám phá thế giới.';
      if (grade === '4') return 'Quản lý thông tin, rèn luyện gõ phím, phần mềm trình chiếu và lập trình Scratch cơ bản.';
      if (grade === '5') return 'Sử dụng công cụ đa phương tiện, phần mềm trình chiếu đa phương tiện và lập trình hệ thống.';
      return 'Khám phá thế giới công nghệ thông tin.';
    } else {
      if (grade === '3') return 'Nhận biết biển báo giao thông, thiết bị điện và làm đồ dùng, đồ chơi thủ công.';
      if (grade === '4') return 'Kỹ thuật lắp ráp các mô hình cơ bản và tìm hiểu, trồng các loại hoa, cây cảnh.';
      if (grade === '5') return 'Lắp ráp mô hình cơ điện nâng cao và tìm hiểu về các đồ dùng điện trong gia đình.';
      return 'Khám phá kĩ thuật lắp ráp và công nghệ đời sống.';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isWelcomeStage ? 'bg-[#5c8ef2]' : 'bg-polka'}`}>
      {/* Navbar for Subject Selection and Quiz and Result */}
      {!isWelcomeStage && (
        <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f59e0b] rounded-xl flex items-center justify-center shadow-md">
              <Star className="text-white fill-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-[#1e3a8a] font-extrabold text-sm md:text-lg leading-tight uppercase tracking-tight">TH Lương Thế Vinh</h1>
              <p className="text-[#ea580c] font-bold text-[10px] uppercase tracking-widest">Năm Học 2025 - 2026</p>
            </div>
          </div>
          <button onClick={resetAll} className="flex items-center gap-2 bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1d4ed8] px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-colors border border-[#bfdbfe] shadow-sm uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" /> {userInfo.name} ({userInfo.className})
          </button>
        </header>
      )}

      <main className="flex-1 flex items-center justify-center p-2 md:p-4 relative z-10 w-full max-w-5xl mx-auto py-4 md:py-8">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: NAME */}
          {stage === 'STEP_1_NAME' && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-md text-center"
            >
              <div className="text-6xl mb-6">🌈</div>
              <h2 className="text-2xl font-bold text-[#3b82f6] uppercase tracking-wide mb-2">Chào mừng em!</h2>
              <p className="text-gray-500 italic text-sm font-medium mb-8">Họ và tên em là gì nhỉ?</p>
              
              <form onSubmit={handleNameSubmit} className="space-y-6">
                <input
                  type="text"
                  required
                  placeholder="VIẾT TÊN VÀO ĐÂY NHÉ..."
                  className="w-full text-center px-6 py-4 rounded-3xl border border-gray-200 bg-white focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all font-bold text-gray-700 placeholder:font-normal placeholder:text-gray-400 shadow-sm"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                />
                <button
                  type="submit"
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-4 rounded-3xl shadow-[0_6px_0_0_#1d4ed8] hover:translate-y-1 hover:shadow-[0_4px_0_0_#1d4ed8] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Tiếp theo <span className="text-xl">➡️</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* STAGE 2: CLASS */}
          {stage === 'STEP_2_CLASS' && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-md text-center"
            >
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-2xl font-bold text-[#8b5cf6] uppercase tracking-wide mb-8">Em học lớp nào?</h2>
              
              <form onSubmit={handleClassSubmit} className="space-y-6">
                <div className="flex gap-2 justify-center">
                  {(['3', '4', '5'] as Grade[]).map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setUserInfo({ ...userInfo, grade })}
                      className={`flex-1 py-3 rounded-2xl font-bold transition-all border ${
                        userInfo.grade === grade 
                        ? 'bg-[#f3e8ff] border-[#d8b4fe] text-[#7e22ce]' 
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      Khối {grade}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  required
                  placeholder="LỚP CỦA EM (VD: 3A1...)"
                  className="w-full text-center px-6 py-4 rounded-3xl border border-[#f3e8ff] bg-[#faf5ff] focus:border-[#d8b4fe] focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all font-bold text-[#7e22ce] placeholder:font-normal placeholder:text-gray-400 uppercase"
                  value={userInfo.className}
                  onChange={(e) => setUserInfo({ ...userInfo, className: e.target.value })}
                />
                
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setStage('STEP_1_NAME')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-3xl transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold py-4 rounded-3xl shadow-[0_6px_0_0_#7e22ce] hover:translate-y-1 hover:shadow-[0_4px_0_0_#7e22ce] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    Xong rồi 🌟
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STAGE 3: GREETING */}
          {stage === 'STEP_3_GREETING' && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white rounded-[40px] shadow-2xl p-10 w-full max-w-md text-center"
            >
              <div className="text-7xl mb-6">🎁</div>
              <p className="text-[#ec4899] font-bold text-xs uppercase tracking-widest mb-2">Lớp {userInfo.className} - Khối {userInfo.grade}</p>
              <h2 className="text-[#1e293b] text-2xl font-black uppercase mb-1">Chào mừng em</h2>
              <h1 className="text-[#2563eb] text-4xl font-black uppercase mb-8">{userInfo.name}</h1>
              
              <div className="bg-[#fefce8] border border-[#fef08a] rounded-3xl p-6 mb-8 text-sm font-medium text-[#475569] italic leading-relaxed shadow-sm">
                Em chuẩn bị vào ôn tập kiểm tra học kỳ 2 môn Tin học và Công nghệ, thầy chúc em ôn tập thật tốt nhé! 🌈
              </div>

              <button
                onClick={handleGreetingNext}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black py-5 rounded-3xl shadow-[0_6px_0_0_#15803d] hover:translate-y-1 hover:shadow-[0_4px_0_0_#15803d] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest flex items-center justify-center gap-2 text-lg"
              >
                Vào ôn tập 🏆
              </button>
            </motion.div>
          )}

          {/* SUBJECT SELECTION */}
          {stage === 'SUBJECT_SELECTION' && (
            <motion.div
              key="subject_selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <div className="text-center mb-10">
                <div className="inline-block bg-[#ec4899] text-white font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                  Vui học mỗi ngày
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1e293b] tracking-tight mb-2 uppercase">Ôn tập học kì 2</h2>
                <p className="text-[#3b82f6] italic font-medium">Lựa chọn môn học để bắt đầu</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[40px] shadow-xl border border-gray-100 border-t-[12px] border-t-[#3b82f6] p-8 flex flex-col"
                >
                  <div className="w-16 h-16 bg-[#eff6ff] rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl">💻</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#1e3a8a] uppercase mb-2">Môn Tin Học</h3>
                  <p className="text-gray-500 font-medium italic mb-8 flex-1">{getSubjectDescription('Tin học', userInfo.grade)}</p>
                  
                  <button
                    onClick={() => handleSubjectSelect('Tin học')}
                    className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold text-lg py-4 rounded-2xl transition-all block uppercase tracking-wider"
                  >
                    Ôn tập ngay
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[40px] shadow-xl border border-gray-100 border-t-[12px] border-t-[#ea580c] p-8 flex flex-col"
                >
                  <div className="w-16 h-16 bg-[#ffedd5] rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl">🛠️</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#7c2d12] uppercase mb-2">Môn Công Nghệ</h3>
                  <p className="text-gray-500 font-medium italic mb-8 flex-1">{getSubjectDescription('Công nghệ', userInfo.grade)}</p>
                  
                  <button
                    onClick={() => handleSubjectSelect('Công nghệ')}
                    className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-lg py-4 rounded-2xl transition-all block uppercase tracking-wider"
                  >
                    Ôn tập ngay
                  </button>
                </motion.div>
              </div>
              
              <div className="text-center mt-12">
                <button 
                  onClick={resetAll}
                  className="text-gray-400 hover:text-gray-600 underline font-medium text-sm transition-colors"
                >
                  * Đổi học sinh khác
                </button>
              </div>
            </motion.div>
          )}

          {/* === QUIZ STAGE === */}
          {stage === 'QUIZ' && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl md:rounded-[40px] overflow-hidden flex flex-col border border-gray-100 min-h-[80vh] md:min-h-0"
            >
              <div className="bg-white px-4 md:px-8 py-4 md:py-6 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className={`font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm ${quizState.selectedSubject === 'Tin học' ? 'bg-[#dbeafe] text-[#1d4ed8]' : 'bg-[#ffedd5] text-[#c2410c]'}`}>
                    {quizState.selectedSubject}
                  </span>
                  <span className="text-xs md:text-sm font-bold text-gray-400">Khối {userInfo.grade}</span>
                </div>
                <div className="font-bold text-gray-500 text-xs md:text-sm bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-gray-100">
                  Câu {quizState.currentQuestionIndex + 1} / {currentQuestions.length}
                </div>
              </div>

              <div className="w-full bg-gray-100 h-1.5 overflow-hidden">
                <motion.div 
                  className={`h-1.5 rounded-r-full ${quizState.selectedSubject === 'Tin học' ? 'bg-[#3b82f6]' : 'bg-[#ea580c]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((quizState.currentQuestionIndex) / currentQuestions.length) * 100}%` }}
                />
              </div>

              <div className="p-4 sm:p-8 md:p-12 flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1e293b] mb-6 md:mb-8 leading-snug">
                  {currentQuestion.text}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, idx) => {
                    const hasAnswered = quizState.answers[quizState.currentQuestionIndex] !== undefined;
                    const isSelected = quizState.answers[quizState.currentQuestionIndex] === idx;
                    const isCorrect = idx === currentQuestion.correctAnswerIndex;
                    
                    let btnClass = "w-full text-left p-3 md:p-5 text-base md:text-lg transition-all flex justify-between items-center group font-medium rounded-2xl border-2 ";
                    
                    if (!hasAnswered) {
                      btnClass += "bg-white border-gray-100 hover:border-[#93c5fd] hover:bg-[#eff6ff] text-gray-700 active:scale-[0.98]";
                    } else {
                      if (isCorrect) {
                        btnClass += "border-green-400 bg-green-50 text-green-700 shadow-sm";
                      } else if (isSelected && !isCorrect) {
                        btnClass += "border-red-400 bg-red-50 text-red-700 shadow-sm";
                      } else {
                        btnClass += "border-gray-50 bg-gray-50 text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={hasAnswered}
                        className={btnClass}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black transition-colors ${
                            hasAnswered 
                              ? (isCorrect ? 'bg-green-100 text-green-600' : isSelected ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-400') 
                              : 'bg-gray-100 text-gray-500 group-hover:bg-[#3b82f6] group-hover:text-white'
                            }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </div>

                        {hasAnswered && isCorrect && <CheckCircle2 className="w-7 h-7 text-green-500 animate-bounce" />}
                        {hasAnswered && isSelected && !isCorrect && <XCircle className="w-7 h-7 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {quizState.answers[quizState.currentQuestionIndex] !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-gray-50 border-t border-gray-100 p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-center"
                  >
                    <div className="flex-1 w-full">
                      <p className="text-gray-700 bg-white p-4 md:p-5 text-sm md:text-base rounded-2xl border border-gray-200 shadow-sm font-medium">
                        <span className={`font-extrabold block mb-1 text-sm uppercase tracking-wider ${quizState.selectedSubject === 'Tin học' ? 'text-[#2563eb]' : 'text-[#ea580c]'}`}>Giải thích:</span>
                        {currentQuestion.explanation}
                      </p>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className={`flex-shrink-0 w-full md:w-auto h-14 md:h-16 px-6 md:px-8 text-white font-bold rounded-2xl transition-all flex justify-center items-center gap-2 text-base md:text-lg active:translate-y-1 active:shadow-none ${
                        quizState.selectedSubject === 'Tin học' 
                          ? 'bg-[#3b82f6] hover:bg-[#2563eb] shadow-[0_6px_0_0_#1d4ed8]' 
                          : 'bg-[#ea580c] hover:bg-[#c2410c] shadow-[0_6px_0_0_#9a3412]'
                      }`}
                    >
                      {quizState.currentQuestionIndex === currentQuestions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* === RESULT STAGE === */}
          {stage === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl bg-white shadow-2xl rounded-[48px] overflow-hidden my-8 z-10 border border-gray-100"
            >
              <div className={`p-10 text-white text-center relative overflow-hidden ${
                quizState.selectedSubject === 'Tin học' ? 'bg-[#3b82f6]' : 'bg-[#ea580c]'
              }`}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0yMCAxMGwxMCAyMEgxMHoiIGZpbGw9IiNmZmYiLz4KPC9zdmc+')] bg-repeat opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-6xl mb-4 p-4 bg-white/20 backdrop-blur-sm rounded-3xl rotate-12 shadow-lg border border-white/30">
                    🏆
                  </div>
                  <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">KẾT QUẢ BÀI THI</h1>
                  <p className="text-sm font-bold bg-white/20 backdrop-blur-sm inline-block px-4 py-2 rounded-xl border border-white/30">{quizState.selectedSubject} - Lớp {userInfo.grade}</p>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col items-center mb-10">
                  <div className="text-gray-400 font-bold mb-2 uppercase tracking-wider text-xs">Điểm của bạn</div>
                  <div className={`text-7xl font-black drop-shadow-sm flex items-end ${quizState.selectedSubject === 'Tin học' ? 'text-[#2563eb]' : 'text-[#c2410c]'}`}>
                    {calculateScore()} <span className="text-3xl text-gray-300 ml-2 mb-2 font-black">/ 10</span>
                  </div>
                  <div className="mt-6 bg-gray-50 text-gray-700 px-6 py-3 rounded-2xl font-bold text-sm border border-gray-200 flex items-center gap-2 shadow-sm">
                    <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" /> 
                    {getFeedback(calculateScore())}
                    <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" /> 
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider mb-4 pl-2">Chi tiết đáp án</h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {currentQuestions.map((q, idx) => {
                      const isCorrect = quizState.answers[idx] === q.correctAnswerIndex;
                      return (
                        <div key={idx} className={`p-6 rounded-3xl border ${isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
                          <div className="flex gap-4">
                            <div className="mt-0.5">
                              {isCorrect ? <CheckCircle2 className="text-green-500 w-7 h-7" /> : <XCircle className="text-red-500 w-7 h-7" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-[#1e293b] mb-3 text-lg leading-snug">Câu {idx + 1}: {q.text}</p>
                              <div className="space-y-2">
                                {!isCorrect && (
                                  <p className="text-sm font-semibold text-red-700 bg-red-100 inline-block px-4 py-2 rounded-xl">
                                    <span className="opacity-70 mr-1">Bạn chọn:</span> {q.options[quizState.answers[idx]]}
                                  </p>
                                )}
                                <div className={`${!isCorrect ? 'mt-2' : ''}`}>
                                  <p className="text-sm font-semibold text-green-700 bg-green-100 inline-block px-4 py-2 rounded-xl">
                                    <span className="opacity-70 mr-1">Đáp án đúng:</span> {q.options[q.correctAnswerIndex]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={selectAnotherSubject}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold h-16 rounded-2xl transition-all flex justify-center items-center gap-2 uppercase tracking-wider"
                  >
                    Về Trang Chủ Môn Học
                  </button>
                  <button
                    onClick={() => {
                      playSound('click');
                      setQuizState({ currentQuestionIndex: 0, answers: {}, selectedSubject: quizState.selectedSubject });
                      setStage('QUIZ');
                    }}
                    className={`flex-1 text-white font-bold h-16 rounded-2xl active:translate-y-1 active:shadow-none transition-all flex justify-center items-center gap-2 uppercase tracking-wider ${
                      quizState.selectedSubject === 'Tin học' 
                      ? 'bg-[#3b82f6] hover:bg-[#2563eb] shadow-[0_6px_0_0_#1d4ed8]' 
                      : 'bg-[#ea580c] hover:bg-[#c2410c] shadow-[0_6px_0_0_#9a3412]'
                    }`}
                  >
                    <RotateCcw className="w-5 h-5" /> Thi Lại Môn Này
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
