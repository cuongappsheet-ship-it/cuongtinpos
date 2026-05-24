export interface Registration {
  id: string;
  studentName: string;
  studentDob: string;
  studentGender: string;
  studentSchool: string;
  studentArea: string;
  studentPob: string;
  birthCert: string;
  preschoolCert: string;
  vaccine: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentEmail?: string;
  parentAddress: string;
  status: 'Chờ xét duyệt' | 'Đã phê duyệt' | 'Cần bổ sung hồ sơ';
  submittedAt: string;
}

export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
  id: string;
}
