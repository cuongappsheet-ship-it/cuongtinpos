export type Grade = '3' | '4' | '5';
export type Subject = 'Công nghệ' | 'Tin học';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface EssayQuestion {
  id: string;
  text: string;
  suggestedAnswer: string;
}

export const essayBank: Record<Grade, Record<Subject, EssayQuestion[]>> = {
  '3': {
    'Tin học': [
      { id: 'e_t3_1', text: 'Em hãy kể tên các bộ phận cơ bản của máy tính để bàn.', suggestedAnswer: 'Máy tính để bàn có 4 bộ phận cơ bản: Màn hình, Thân máy (CPU), Bàn phím và Chuột.' },
      { id: 'e_t3_2', text: 'Nêu tư thế ngồi đúng khi làm việc với máy tính để bảo vệ sức khoẻ.', suggestedAnswer: 'Tư thế ngồi đúng: Lưng thẳng, vai thả lỏng. Mắt ngang tầm màn hình, khoảng cách từ mắt đến màn hình từ 50-80cm. Chân đặt phẳng trên nền nhà.' }
    ],
    'Công nghệ': [
      { id: 'e_c3_1', text: 'Kể tên 3 vật dụng trong nhà có thể gây bỏng và cách phòng tránh nguy hiểm khi sử dụng.', suggestedAnswer: 'Bàn là, phích nước nóng, bếp ga. Cách phòng tránh: Không tự ý sử dụng khi không có người lớn, tuyệt đối không chạm tay vào bề mặt nóng.' },
      { id: 'e_c3_2', text: 'Nêu ý nghĩa của 3 màu đèn tín hiệu giao thông cơ bản.', suggestedAnswer: 'Đèn Đỏ: Dừng lại. Đèn Vàng: Đi chậm lại và dừng trước vạch sơn. Đèn Xanh: Được phép đi.' }
    ]
  },
  '4': {
    'Tin học': [
      { id: 'e_t4_1', text: 'Thư mục là gì? Việc sắp xếp thông tin trong máy tính có lợi ích gì?', suggestedAnswer: 'Thư mục là nơi lưu trữ các tệp và các thư mục con khác. Sắp xếp thông tin vào cẩn thận giúp quản lý, tìm kiếm dễ dàng và nhanh chóng hơn khi cần.' },
      { id: 'e_t4_2', text: 'Nêu 2 tác hại của việc sử dụng Internet quá nhiều.', suggestedAnswer: '1. Ảnh hưởng đến sức khoẻ (mắt cận thị, cong vẹo cột sống nếu ngồi sai tư thế). 2. Dễ bị phân tâm việc học, có thể gặp phải thông tin độc hại hoặc kẻ xấu trên mạng.' }
    ],
    'Công nghệ': [
      { id: 'e_c4_1', text: 'Nêu các bước cơ bản để làm một món đồ chơi dân gian (ví dụ chong chóng giấy).', suggestedAnswer: 'Bước 1: Chuẩn bị vật liệu (giấy, kéo, ghim băng, que tre). Bước 2: Cắt giấy thành hình vuông, cắt 4 góc dọc theo đường chéo. Bước 3: Gấp các mép xen kẽ vào tâm và đính ghim cố định vào đầu que tre.' },
      { id: 'e_c4_2', text: 'Khi làm đồ thủ công xong, em cần dọn dẹp như thế nào?', suggestedAnswer: 'Cất gọn gàng các dụng cụ (kéo, hồ dán) vào hộp đựng, thu gom giấy vụn/rác thừa bỏ vào thùng rác, rửa sạch tay nếu bị dính hồ hoặc màu.' }
    ]
  },
  '5': {
    'Tin học': [
      { id: 'e_t5_1', text: 'Thế nào là thuật toán lặp? Cho một ví dụ trong đời sống.', suggestedAnswer: 'Thuật toán lặp là việc thực hiện lặp đi lặp lại một hoặc một số hành động cho đến khi thỏa mãn một điều kiện nào đó. Ví dụ: Rửa bát - lặp lại việc nhúng nước, chà xà phòng, tráng nước cho từng cái bát đến khi hết bát bẩn thì dừng.' },
      { id: 'e_t5_2', text: 'Trí tuệ nhân tạo (AI) mang lại những lợi ích gì cho con người? Kể tên 2 ứng dụng của AI mà em biết.', suggestedAnswer: 'Lợi ích: Giúp con người làm việc nhanh hơn, xử lý khối lượng lớn thông tin, giải trí, hỗ trợ học tập. Ứng dụng: Chatbot trả lời tự động, Nhận diện khuôn mặt trên điện thoại, Phần mềm dịch ngôn ngữ siêu tốc.' }
    ],
    'Công nghệ': [
      { id: 'e_c5_1', text: 'Tại sao chúng ta phải thiết kế hoặc xem bản vẽ mô hình trước khi chế tạo/lắp ráp sản phẩm kĩ thuật?', suggestedAnswer: 'Việc xem bản vẽ/thiết kế mô hình giúp ta hình dung được hình dáng, cấu tạo của sản phẩm, biết cần chuẩn bị bao nhiêu chi tiết, tránh lắp sai thứ tự dẫn tới phải tháo ra lắp lại nhiều lần.' },
      { id: 'e_c5_2', text: 'Nêu 3 tiêu chí đánh giá một sản phẩm đồ chơi tái chế (ví dụ ống cắm bút từ vỏ chai).', suggestedAnswer: '1. Tính hữu dụng (đựng được bút chắc chắn). 2. Tính thẩm mỹ (trang trí đẹp mắt, sáng tạo). 3. Đảm bảo an toàn sức khoẻ (không có cạnh sắc nhọn dễ gây đứt tay, rửa sạch trước khi làm).' }
    ]
  }
};

export const questionBank: Record<Grade, Record<Subject, Question[]>> = {
  '3': {
    'Tin học': [
      { id: 't3_6', text: 'Sơ đồ hình cây là cấu trúc phân cấp thông tin. Sơ đồ hình cây bắt đầu với một ...(1)..., sau đó phân thành các ...(2)...', options: ['(1) - gốc, (2) - nhánh', '(1) - gốc, (2) - loại', '(1) - từ, (2) - nhánh', '(1) - loại, (2) - gốc'], correctAnswerIndex: 0, explanation: 'Sơ đồ hình cây bao giờ cũng xuất phát từ một đối tượng lớn nhất gọi là "gốc", sau đó tỏa ra các "nhánh" là các thành phần nhỏ hơn.' },
      { id: 't3_7', text: 'Biểu tượng hình kẹp tài liệu màu vàng trên máy tính thường biểu diễn cho:', options: ['Thư mục (Folder)', 'Tệp (File)', 'Ổ đĩa', 'Con chuột'], correctAnswerIndex: 0, explanation: 'Những biểu tượng có hình kẹp giấy màu vàng là các Thư mục (Folder) dùng để lưu trữ dữ liệu hoặc các thư mục con khác bên trong.' },
      { id: 't3_8', text: 'Để bắt đầu tìm và mở các thư mục hay ổ đĩa có sẵn trong máy tính, em nháy đúp chuột vào biểu tượng nào?', options: ['Recycle Bin (Thùng rác)', 'Control Panel', 'This PC (hoặc My Computer)', 'Paint'], correctAnswerIndex: 2, explanation: 'Biểu tượng This PC (hoặc My Computer) chứa các ổ đĩa và thư mục hệ thống của máy tính.' },
      { id: 't3_9', text: 'Cửa sổ làm việc với tệp và thư mục trên máy tính thường có mấy khung chính?', options: ['Một khung', 'Hai khung', 'Ba khung', 'Bốn khung'], correctAnswerIndex: 1, explanation: 'Cửa sổ thư mục thường có hai khung chính: Khung điều hướng (Navigation pane) bên trái và Khung nội dung (Contents pane) bên phải.' },
      { id: 't3_10', text: 'Điền từ thích hợp: Các ... được sắp xếp trong thư mục để dễ quản lí và tìm kiếm.', options: ['nhóm', 'tệp', 'ổ đĩa', 'câu'], correctAnswerIndex: 1, explanation: 'Các tệp (file) thường được lưu trữ và sắp xếp có trật tự trong các thư mục để ta dễ dàng quản lý và tìm kiếm khi cần.' },
      { id: 't3_11', text: 'Để đổi tên thư mục "Lớp3" thành thư mục "3A" thì bước đầu tiên cần làm gì?', options: ['Nháy chuột vào thư mục 3A', 'Gõ tên mới 3A. Nhấn phím Enter để kết thúc', 'Nháy chuột vào thư mục Lớp3 để chọn', 'Trong dải lệnh Home, chọn lệnh Rename'], correctAnswerIndex: 2, explanation: 'Bước đầu tiên khi đổi tên bất kỳ tệp hay thư mục nào là em phải chọn đối tượng đó trước bằng cách nháy chuột vào nó.' },
      { id: 't3_12', text: 'Thông tin nào của gia đình em có thể lưu trữ trong máy tính?', options: ['Ảnh Căn cước công dân của bố', 'Số điện thoại của mẹ', 'Video đi dã ngoại của gia đình', 'Tất cả các ý trên đều đúng'], correctAnswerIndex: 3, explanation: 'Máy tính có thể lưu trữ rất nhiều dạng thông tin như: hình ảnh, văn bản (số điện thoại), video âm thanh...' },
      { id: 't3_13', text: 'Thông tin lưu trữ trong máy tính có thể gửi đến các máy tính khác ... Internet hoặc các thiết bị lưu trữ như USB, thẻ nhớ.', options: ['thông qua', 'lưu trữ', 'sao chép', 'dán'], correctAnswerIndex: 0, explanation: 'Thông qua mạng Internet, thông tin có thể được truyền tải dễ dàng giữa các máy tính với nhau.' },
      { id: 't3_14', text: 'Biểu tượng nào sau đây là của phần mềm trình chiếu?', options: ['Microsoft Word (W màu xanh)', 'Microsoft PowerPoint (P màu cam)', 'Microsoft Excel (X màu xanh lá)', 'Microsoft Teams (T màu tím)'], correctAnswerIndex: 1, explanation: 'Microsoft PowerPoint với biểu tượng chữ P màu cam/đỏ là phần mềm chuyên để làm bài trình chiếu.' },
      { id: 't3_15', text: 'Thực hiện công việc theo đúng thứ tự đã sắp xếp thì công việc sẽ như thế nào?', options: ['Khó quản lý', 'Dễ quản lý', 'Dễ dàng hoàn thành', 'Khó hoàn thành'], correctAnswerIndex: 2, explanation: 'Biết chia nhỏ và thực hiện công việc theo đúng thứ tự logic sẽ giúp ta hoàn thành công việc dễ dàng hơn.' },
      { id: 't3_16', text: 'Khi đang đi đến ngã tư có đèn tín hiệu giao thông, em dừng lại hay đi tiếp phụ thuộc vào điều gì?', options: ['Xe đi nhiều hay ít', 'Màu của đèn tín hiệu giao thông', 'Đường có đông người hay không', 'Màu đèn của cột điện'], correctAnswerIndex: 1, explanation: 'Hành động dừng hay đi phụ thuộc vào màu của đèn giao thông (Xanh đi, Đỏ dừng).' },
      { id: 't3_17', text: 'Một công việc lớn nên được chia thành gì để dễ thực hiện?', options: ['Những việc nhỏ hơn', 'Những việc lớn hơn', 'Những việc mới', 'Các đầu việc'], correctAnswerIndex: 0, explanation: 'Để dễ dàng giải quyết một công việc lớn, ta nên chia nhỏ chúng thành các việc nhỏ hơn.' },
      { id: 't3_18', text: 'Câu nào sau đây được phát biểu đúng theo cấu trúc điều kiện "Nếu ... thì ..."?', options: ['Nếu đèn giao thông chuyển sang màu đỏ, em dừng lại', 'Nếu đèn giao thông chuyển sang màu đỏ, thì em phải dừng lại', 'Đèn giao thông chuyển sang màu đỏ, em dừng lại', 'Đèn giao thông chuyển sang màu đỏ thì em dừng lại'], correctAnswerIndex: 1, explanation: 'Cấu trúc đầy đủ của câu điều kiện là phải có cả "Nếu..." làm điều kiện và "...thì..." làm kết quả hành động.' },
      { id: 't3_19', text: 'Các bước để chèn ảnh vào trang trình chiếu là:', options: ['Nháy chuột vào thẻ Home → nháy chuột vào nút lệnh New Slide', 'Nháy chuột vào thẻ File → nháy chuột vào nút lệnh Save', 'Nháy chuột vào thẻ Insert → nháy chuột vào nút lệnh Table', 'Nháy chuột vào thẻ Insert → nháy chuột vào nút lệnh Picture → mở thư mục chứa ảnh → chọn ảnh → nháy chuột vào Insert'], correctAnswerIndex: 3, explanation: 'Để chèn ảnh, ta vào thẻ Insert, chọn Picture, sau đó tìm và chọn ảnh cần chèn rồi nhấn Insert.' },
      { id: 't3_20', text: 'Thông thường thì trang đầu tiên của bài trình chiếu có sẵn hai ...', options: ['Khung văn bản', 'Hình ảnh', 'Bảng', 'Sơ đồ'], correctAnswerIndex: 0, explanation: 'Trang slide đầu tiên (Title Slide) thường có sẵn 2 khung văn bản dùng để nhập tiêu đề và nội dung phụ đề.' },
      { id: 't3_21', text: 'Dùng phần mềm nào để khám phá thế giới tự nhiên?', options: ['SolarSystem', 'Mario', 'KeyBlaze Typing Tutor', 'Kids Games Learning Science'], correctAnswerIndex: 3, explanation: 'Kids Games Learning Science là phần mềm giáo dục giúp các em nhỏ khám phá khoa học, thế giới tự nhiên.' },
      { id: 't3_22', text: 'Các giai đoạn vòng đời phát triển của sâu bướm là:', options: ['Trứng, sâu bướm', 'Trứng, sâu bướm, kén', 'Trứng, sâu bướm, nhộng', 'Trứng, sâu bướm, nhộng, bướm'], correctAnswerIndex: 3, explanation: 'Vòng đời đầy đủ của bướm trải qua 4 giai đoạn: Trứng -> Sâu bướm -> Nhộng (nằm trong kén) -> Bướm trưởng thành.' },
      { id: 't3_23', text: 'Nhờ sử dụng máy tính, em quan sát được hành tinh nào lớn nhất?', options: ['Thổ tinh', 'Kim tinh', 'Mộc tinh', 'Hỏa tinh'], correctAnswerIndex: 2, explanation: 'Trong Hệ Mặt Trời, Mộc tinh (Jupiter) là hành tinh có rực rỡ và kích thước lớn nhất.' },
    ],
    'Công nghệ': [
      { id: 'c3_1', text: 'Em có thể dùng tay thực hiện các thao tác tạo hình nào sau đây?', options: ['Xé, cắt', 'Nặn, dán', 'Cắt, dán', 'Nặn, gấp'], correctAnswerIndex: 3, explanation: 'Khi tạo hình bằng tay, em có thể thực hiện thao tác nặn (đất sét) hoặc gấp (giấy) mà không cần dùng đến các dụng cụ khác.' },
      { id: 'c3_2', text: 'Em cần lưu ý gì khi sử dụng các dụng cụ và vật liệu thủ công?', options: ['Khi hoàn thành công việc, cần cất gọn', 'Khi hoàn thành công việc, không cần cất gọn', 'Hoàn chưa thành công việc, không cần cất gọn', 'Khi chưa hoàn thành công việc, cần cất gọn'], correctAnswerIndex: 0, explanation: 'Sau khi làm xong sản phẩm thủ công, em cần dọn dẹp và cất gọn gàng các dụng cụ, vật liệu thừa để đảm bảo vệ sinh và an toàn.' },
      { id: 'c3_3', text: 'Đâu là đặc điểm của biển báo giao thông CHỈ DẪN?', options: ['Hình tròn, viền đỏ, có gạch chéo', 'Hình vuông hoặc hình chữ nhật, nền xanh lam', 'Hình tam giác đều, viền đỏ, nền vàng', 'Hình bát giác màu đỏ có chữ STOP'], correctAnswerIndex: 1, explanation: 'Biển báo chỉ dẫn thường có hình vuông hoặc hình chữ nhật, nền màu xanh lam, dùng để chỉ dẫn hướng đi hoặc các điều cần biết.' },
      { id: 'c3_4', text: 'Điền từ còn thiếu vào chỗ chấm: Thông điệp 4Đ gồm các nội dung: đúng lúc, ...., đúng thời lượng, đúng cách.', options: ['đúng chỗ', 'đúng cách', 'đúng số lượng', 'đúng thời gian'], correctAnswerIndex: 0, explanation: 'Thông điệp 4Đ khi xem truyền hình là: Đúng lúc - Đúng chỗ - Đúng thời lượng - Đúng cách.' },
      { id: 'c3_5', text: 'Xe đồ chơi (mô hình) thường có mấy bộ phận chính?', options: ['1 bộ phận', '2 bộ phận', '3 bộ phận', '4 bộ phận'], correctAnswerIndex: 2, explanation: 'Mô hình xe đồ chơi thường có 3 bộ phận chính.' },
      { id: 'c3_6', text: 'Thứ tự đúng các bước để làm thước kẻ bằng giấy là:', options: ['Tạo hình của thước -> Chia vạch trên thước -> Dán tạo khung thước -> Hoàn thiện sản phẩm', 'Tạo hình của thước -> Dán tạo khung thước -> Chia vạch trên thước -> Hoàn thiện sản phẩm', 'Chia vạch trên thước -> Tạo hình của thước -> Dán tạo khung thước -> Hoàn thiện sản phẩm', 'Dán tạo khung thước -> Chia vạch trên thước -> Tạo hình của thước -> Hoàn thiện sản phẩm'], correctAnswerIndex: 1, explanation: 'Thứ tự đúng: Bước 1 - Tạo hình của thước, Bước 2 - Dán tạo khung thước, Bước 3 - Chia vạch trên thước, Bước 4 - Hoàn thiện sản phẩm.' },
      { id: 'c3_7', text: 'Tấm biển báo giao thông đường bộ đầu tiên xuất hiện ở đâu và cách đây khoảng bao lâu?', options: ['Ở Rô-ma, cách đây hơn hai ngàn năm', 'Ở Nê-man, cách đây hơn hai ngàn năm', 'Ở Rô-ma, cách đây hơn một ngàn năm', 'Ở Nê-man, cách đây hơn một ngàn năm'], correctAnswerIndex: 0, explanation: 'Tấm biển báo giao thông đường bộ đầu tiên xuất hiện ở Rô-ma cách đây hơn hai ngàn năm.' },
      { id: 'c3_8', text: 'Vị trí đặt các thiết bị điện như lò vi sóng, ấm đun nước nên ở đâu?', options: ['Đặt ở nơi ẩm ướt, gần bồn rửa bát', 'Đặt ở nơi khô ráo, bằng phẳng và xa tầm tay trẻ em', 'Đặt sát mép bàn để dễ sử dụng', 'Đặt ở nơi có ánh nắng mặt trời chiếu trực tiếp vào'], correctAnswerIndex: 1, explanation: 'Thiết bị điện cần đặt những nơi khô ráo, an toàn, bằng phẳng và cần tránh xa tầm tay trẻ em để tránh gây tai nạn về điện hay bỏng.' },
      { id: 'c3_9', text: 'Dụng cụ nào dùng để cắt giấy và bìa mỏng khi làm thủ công?', options: ['Thước kẻ', 'Hồ dán', 'Kéo', 'Bút chì'], correctAnswerIndex: 2, explanation: 'Kéo là dụng cụ an toàn và phù hợp nhất để cắt giấy, bìa khi thực hành thủ công.' },
      { id: 'c3_10', text: 'Khi đưa kéo cho bạn, cách làm nào là đúng và an toàn nhất?', options: ['Cầm lưỡi kéo và đưa phần tay cầm về phía bạn', 'Cầm tay cầm và đưa phần mũi kéo về phía bạn', 'Ném kéo cho bạn để tiết kiệm thời gian', 'Mở rộng kéo khi đưa cho bạn'], correctAnswerIndex: 0, explanation: 'Để đảm bảo an toàn không gây sát thương, em cần cầm chặt phần lưỡi kéo (đã khép lại) và hướng phần chuôi (tay cầm) về phía người nhận.' },
      { id: 'c3_11', text: 'Vật liệu nào sau đây thuộc nhóm vật liệu tái chế?', options: ['Giấy thủ công mới mua', 'Vỏ chai nhựa đã qua sử dụng', 'Đất nặn', 'Băng dính hai mặt'], correctAnswerIndex: 1, explanation: 'Vỏ chai nhựa đã qua sử dụng là vật liệu có thể tái chế để làm thành các đồ vật/đồ chơi hữu ích khác.' },
      { id: 'c3_12', text: 'Dụng cụ nào dùng để vẽ các đường tròn một cách chính xác?', options: ['Thước dài', 'Thước ê-ke', 'Compa', 'Bút dạ'], correctAnswerIndex: 2, explanation: 'Compa là dụng cụ mĩ thuật/thủ công chuyên dụng để vẽ các đường tròn.' },
    ]
  },
  '4': {
    'Tin học': [
      { id: 't4_1', text: 'Thiết bị nào dùng để nhập chữ, số vào máy tính?', options: ['Chuột', 'Bàn phím', 'Màn hình', 'Máy in'], correctAnswerIndex: 1, explanation: 'Bàn phím là thiết bị chính để nhập (gõ) văn bản vào máy tính.' },
      { id: 't4_2', text: 'Phần mềm Paint có công cụ nào hỗ trợ vẽ hình vuông, hình tròn?', options: ['Công cụ tẩy', 'Công cụ tô màu', 'Công cụ hình mẫu (Shapes)', 'Công cụ kính lúp'], correctAnswerIndex: 2, explanation: 'Nhóm Shapes chứa các hình mẫu sẵn như hình tròn, vuông, tam giác, ngôi sao...' },
      { id: 't4_3', text: 'Khi tạo một thư mục mới trên Desktop, em thao tác thế nào?', options: ['Nháy chuột phải -> New -> Folder', 'Nháy chuột phải -> Mở phần mềm', 'Bấm phím Enter', 'Kéo thả chuột'], correctAnswerIndex: 0, explanation: 'Để tạo thư mục, ta nháy chuột phải vào vùng trống, chọn New rồi chọn Folder.' },
      { id: 't4_4', text: 'Internet mang lại lợi ích gì cho việc học tập?', options: ['Chỉ để chơi game', 'Tìm kiếm thông tin, tài liệu học tập', 'Làm máy tính chạy chậm đi', 'Không mang lại lợi ích gì'], correctAnswerIndex: 1, explanation: 'Internet giúp em tiếp cận kho tàng kiến thức khổng lồ để học tập.' },
      { id: 't4_5', text: 'Khi nhận được Email từ người lạ có đính kèm tệp, em nên:', options: ['Mở ra xem ngay lúc đó', 'Xóa thư đó đi, không mở tệp lạ', 'Gửi chuyển tiếp cho bạn bè', 'Lưu tệp về máy'], correctAnswerIndex: 1, explanation: 'Tuyệt đối không nên mở tệp đính kèm từ người lạ để phòng tránh virus máy tính.' },
    ],
    'Công nghệ': [
      { id: 'c4_1', text: 'Đồ chơi nào sau đây là đồ chơi dân gian?', options: ['Robot điều khiển', 'Tò he', 'Xe ô tô điện', 'Máy bay đồ chơi điều khiển từ xa'], correctAnswerIndex: 1, explanation: 'Tò he là một loại đồ chơi dân gian truyền thống của trẻ em Việt Nam được nặn từ bột.' },
      { id: 'c4_2', text: 'Vật liệu chính để làm khung lồng đèn ông sao là gì?', options: ['Nhựa, sắt', 'Thanh tre nứa', 'Thủy tinh', 'Vải mỏng'], correctAnswerIndex: 1, explanation: 'Lồng đèn ông sao truyền thống thường có khung làm từ các thanh tre, nứa.' },
      { id: 'c4_3', text: 'Bước đầu tiên khi tiến hành trồng hoa trong chậu là?', options: ['Chuẩn bị vật liệu, dụng cụ', 'Gieo hạt', 'Tưới nước', 'Bón chậu'], correctAnswerIndex: 0, explanation: 'Chuẩn bị đầy đủ chậu, đất, cây giống và dụng cụ là bước đầu tiên.' },
      { id: 'c4_4', text: 'Sau khi cắt, dán thủ công, em cần làm gì với rác thừa?', options: ['Vứt xuống gầm bàn', 'Để nguyên trên bàn chờ mẹ dọn', 'Thu gom bỏ vào thùng rác', 'Vứt ra ngoài cửa sổ'], correctAnswerIndex: 2, explanation: 'Thu gom rác và bỏ vào thùng rác giúp giữ gìn vệ sinh chung.' },
      { id: 'c4_5', text: 'Cây hoa cúc thường nhân giống bằng cách nào phổ biến?', options: ['Gieo hạt', 'Giâm cành', 'Sử dụng rễ', 'Sử dụng lá'], correctAnswerIndex: 1, explanation: 'Cây hoa cúc thường được nhân giống hiệu quả và phổ biến bằng phương pháp giâm cành.' }
    ]
  },
  '5': {
    'Tin học': [
      { id: 't5_1', text: 'Khối lệnh màu xanh dương "Di chuyển 10 bước" nằm trong nhóm lệnh nào của phần mềm Scratch?', options: ['Hiển thị (Looks)', 'Chuyển động (Motion)', 'Sự kiện (Events)', 'Điều khiển (Control)'], correctAnswerIndex: 1, explanation: 'Các lệnh điều khiển đối tượng đi chuyển, xoay hướng thuộc nhóm lệnh Chuyển động (Motion).' },
      { id: 't5_2', text: 'Để chèn hình ảnh vào văn bản Word, em chọn thẻ nào trên thanh Ribbon?', options: ['Home', 'Insert', 'Design', 'Layout'], correctAnswerIndex: 1, explanation: 'Thẻ Insert chứa các lệnh để chèn đối tượng như hình ảnh (Pictures), bảng (Table), hình khối (Shapes)...' },
      { id: 't5_3', text: 'Trong phần mềm trình chiếu PowerPoint, để trình chiếu bắt đầu từ trang đầu tiên em nhấn phím gì?', options: ['F2', 'F5', 'F1', 'Enter'], correctAnswerIndex: 1, explanation: 'Phím F5 dùng để bắt đầu trình chiếu từ Slide đầu tiên.' },
      { id: 't5_4', text: 'Cấu trúc lặp "Lặp lại mãi mãi" trong thuật toán tương ứng với khối lệnh nào trong Scratch?', options: ['Nếu ... thì ...', 'Lặp lại 10 lần', 'Liên tục (Forever)', 'Đợi 1 giây'], correctAnswerIndex: 2, explanation: 'Khối lệnh Forever cho phép đoạn mã bên trong thực thi lặp đi lặp lại không ngừng.' },
      { id: 't5_5', text: 'Trí tuệ nhân tạo (AI) có thể giúp con người làm việc gì sau đây?', options: ['Dịch thuật ngôn ngữ nhanh chóng', 'Nhận diện hình ảnh y tế', 'Trò chuyện và hỗ trợ khách hàng', 'Tất cả các ý trên'], correctAnswerIndex: 3, explanation: 'AI ngày nay có thể làm được rất nhiều việc như dịch ngôn ngữ, nhận diện hình ảnh, tạo ra các chatbot thông minh để trò chuyện.' },
    ],
    'Công nghệ': [
      { id: 'c5_1', text: 'Sản phẩm nào sau đây là sản phẩm lắp ráp từ bộ lắp ghép mô hình kĩ thuật?', options: ['Mô hình xe cần cẩu', 'Bức tranh vẽ tay', 'Bình hoa nặn đất sét', 'Lồng đèn giấy'], correctAnswerIndex: 0, explanation: 'Mô hình xe cần cẩu có thể được lắp ráp từ các thanh, trục, bánh xe trong bộ kĩ thuật.' },
      { id: 'c5_2', text: 'Dụng cụ nào được dùng để siết chặt hoặc tháo ốc vít trong bộ lắp ghép kĩ thuật?', options: ['Cái kéo', 'Cờ lê và tua vít', 'Cái búa', 'Băng dính'], correctAnswerIndex: 1, explanation: 'Cờ lê và tua vít là hai dụng cụ chuyên dụng để vặn, siết ốc vít ghép nối các chi tiết cơ khí cứng cáp nhau.' },
      { id: 'c5_3', text: 'Điện thoại thông minh (Smartphone) là sản phẩm của ngành nào?', options: ['Nông nghiệp', 'Thủ công nghiệp', 'Công nghệ điện tử - viễn thông', 'Công nghiệp dệt may'], correctAnswerIndex: 2, explanation: 'Điện thoại thông minh là một sản phẩm công nghệ cao thuộc lĩnh vực điện tử viễn thông.' },
      { id: 'c5_4', text: 'Biết sử dụng internet an toàn tức là:', options: ['Cung cấp mật khẩu cho người lạ', 'Đăng ảnh thông tin cá nhân tùy tiện lên mạng', 'Không truy cập các trang web có thông báo nguy hiểm, hỏi ý kiến bố mẹ', 'Chửi bới, chia sẻ tin giả trên mạng'], correctAnswerIndex: 2, explanation: 'Sử dụng Internet an toàn là khi ta biết bảo vệ thông tin, không vào web lạ và có sự giám sát của người lớn.' },
      { id: 'c5_5', text: 'Khi thiết kế một sản phẩm tái chế từ chai nhựa, tiêu chí quan trọng nhất là gì?', options: ['Chai nhựa phải mới 100% mua ngoài quán', 'Sản phẩm có tính ứng dụng (để đựng bút, đồ trang trí...)', 'Màu chai phải trong suốt', 'Chỉ được dùng vỏ chai cô ca không dùng vỏ khác'], correctAnswerIndex: 1, explanation: 'Sản phẩm tái chế tốt nhất là khi nó có thể sử dụng được vào cuộc sống hàng ngày (như làm chậu cây nhỏ, hộp đựng bút...)' }
    ]
  }
};
