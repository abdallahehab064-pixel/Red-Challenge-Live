/**
 * Word (.docx) document generator utility for Arkan Legal Firm
 * Generates standards-compliant Word documents with:
 * 1. Office Header & Branding
 * 2. Watermark: "مؤسسة أركان للمحاماة - نسخة تجريبية معتمدة"
 * 3. Formal legal preamble citing the office name, location, and registration
 * 4. Fillable client fields [اسم العميل] [الرقم القومي] [العنوان]
 * 5. Download trigger as actual .doc / .docx compatible file
 */

export interface ContractGeneratorOptions {
  contractTitle: string;
  category?: string;
  clientName?: string;
  clientNationalId?: string;
  clientPhone?: string;
  clientAddress?: string;
  customClauses?: string[];
  isDraft?: boolean;
}

export function generateArkanWordDocument(options: ContractGeneratorOptions): void {
  const {
    contractTitle,
    category = 'عقد قانوني',
    clientName = '_______________________ (الطرف الثاني)',
    clientNationalId = '____________________',
    clientPhone = '____________________',
    clientAddress = '_________________________________________',
    customClauses = [],
    isDraft = true,
  } = options;

  const todayStr = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Microsoft Word HTML format with MSO namespaces, watermark styling, and RTL document structure
  const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${contractTitle} - مؤسسة أركان</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 595.3pt 841.9pt;
      margin: 2.0cm 2.0cm 2.0cm 2.0cm;
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
      direction: rtl;
      font-family: 'Traditional Arabic', 'Amiri', 'Segoe UI', Tahoma, sans-serif;
    }
    body {
      direction: rtl;
      text-align: right;
      font-family: 'Traditional Arabic', 'Amiri', 'Segoe UI', Tahoma, sans-serif;
      font-size: 14pt;
      line-height: 1.6;
      color: #111827;
      background-color: #ffffff;
    }
    .header-box {
      border-bottom: 3pt double #C9A227;
      padding-bottom: 12pt;
      margin-bottom: 20pt;
      text-align: center;
    }
    .office-title {
      color: #0B1E38;
      font-size: 18pt;
      font-weight: bold;
      margin-bottom: 4pt;
    }
    .office-subtitle {
      color: #8D6E14;
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 4pt;
    }
    .office-info {
      color: #4B5563;
      font-size: 9.5pt;
    }
    .contract-heading {
      text-align: center;
      background-color: #F7F5EC;
      border: 1pt solid #C9A227;
      padding: 10pt;
      margin: 15pt 0;
      font-size: 16pt;
      font-weight: bold;
      color: #0A192F;
    }
    .watermark-banner {
      background-color: #FEF3C7;
      border: 1.5pt dashed #D97706;
      color: #92400E;
      text-align: center;
      padding: 8pt;
      font-size: 12pt;
      font-weight: bold;
      margin-bottom: 18pt;
      border-radius: 4pt;
    }
    .clause-title {
      font-size: 13pt;
      font-weight: bold;
      color: #0B1E38;
      margin-top: 14pt;
      margin-bottom: 4pt;
      text-decoration: underline;
    }
    .fillable-field {
      background-color: #F3F4F6;
      border-bottom: 1.5pt solid #1F2937;
      color: #1E3A8A;
      font-weight: bold;
      padding: 0 4pt;
    }
    .parties-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
    }
    .parties-table td {
      border: 1pt solid #E5E7EB;
      padding: 8pt;
      vertical-align: top;
      font-size: 12pt;
    }
    .signatures-table {
      width: 100%;
      margin-top: 40pt;
      border-collapse: collapse;
    }
    .signatures-table td {
      width: 50%;
      text-align: center;
      padding: 15pt;
      vertical-align: top;
      font-size: 12pt;
    }
    .footer-note {
      border-top: 1pt solid #D1D5DB;
      margin-top: 30pt;
      padding-top: 8pt;
      font-size: 9pt;
      color: #6B7280;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="Section1">
    
    <!-- Legal Firm Header -->
    <div class="header-box">
      <div class="office-title">مؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية</div>
      <div class="office-subtitle">ARKAN LAW & TAX CONSULTING FIRM — قسم الصياغة والعقود التجارية والمدنية</div>
      <div class="office-info">
        العنوان: 5ب أبراج الوطنية، آخر شارع فيصل، قسم الهرم، محافظة الجيزة | هاتف: 01141754963 / 01551658173
      </div>
    </div>

    <!-- Explicit Watermark Box mandated by user request -->
    <div class="watermark-banner">
      ⚠ [ نسخة تجريبية معتمدة ] — صادر ومعد بواسطة مؤسسة أركان للمحاماة والاستشارات القانونية — جاهز لإضافة واعتماد بيانات العميل
    </div>

    <!-- Contract Title -->
    <div class="contract-heading">
      ${contractTitle}
      <div style="font-size: 10pt; font-weight: normal; color: #4B5563; margin-top: 4pt;">
        التصنيف: ${category} | كود المسودة: ARK-DOC-${Date.now().toString().slice(-6)}
      </div>
    </div>

    <p>
      إنه في يوم <strong>${todayStr}</strong>، تحرر هذا العقد والاتفاق بين كل من:
    </p>

    <!-- Parties Section -->
    <table class="parties-table">
      <tr>
        <td style="background-color: #F9FAFB; font-weight: bold; width: 22%;">الطرف الأول:</td>
        <td>
          <strong>مؤسسة أركان للمحاماة والاستشارات</strong> (أو من يمثلها في التعاقد والوكالة)، ويمثلها المستشار القانوني للمؤسسة، الكائن مقرها في: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة. (ويُشار إليها في هذا العقد بـ <strong>"الطرف الأول"</strong>).
        </td>
      </tr>
      <tr>
        <td style="background-color: #F9FAFB; font-weight: bold;">الطرف الثاني (العميل):</td>
        <td>
          السيد / السادة: <span class="fillable-field">${clientName}</span><br>
          الرقم القومي / السجل التجاري: <span class="fillable-field">${clientNationalId}</span><br>
          رقم الهاتف المعتمد: <span class="fillable-field">${clientPhone}</span><br>
          العنوان والموطن المختار: <span class="fillable-field">${clientAddress}</span><br>
          (ويُشار إليه في هذا العقد بـ <strong>"الطرف الثاني"</strong>).
        </td>
      </tr>
    </table>

    <div class="clause-title">تمهيد العقد:</div>
    <p>
      لما كان الطرف الأول مؤسسة قانونية ومهنية متخصصة ومقيدة قانوناً، ولما كان الطرف الثاني يرغب في إبرام هذا التعاقد وتنظيم الالتزامات المتبادلة وفقاً لأحكام القانون المدني والقوانين المصرية السارية، وبعد أن أقر الطرفان بأهليتهما القانونية والشرعية المعتبرة للتعاقد والتصرف، فقد اتفقا على ما يلي:
    </p>

    <div class="clause-title">البند الأول: اعتبار التمهيد جزءاً لا يتجزأ</div>
    <p>
      يُعد التمهيد السابق والوثائق والمستندات الملحقة بهذا العقد جزءاً لا يتجزأ من هذا الاتفاق ومفسراً ومكملاً لكافة بنوده وأحكامه.
    </p>

    <div class="clause-title">البند الثاني: موضوع التعاقد ونطاقه</div>
    <p>
      اتفق الطرفان على قيام الطرف الأول بتقديم الأعمال والموضوعات المحددة في هذا المحرر لصالح الطرف الثاني بمراعاة الأصول الفنية والقانونية السارية، وتحديد نطاق المسؤولية بدقة دون الإخلال بحقوق الغير وحسن النية.
    </p>

    <div class="clause-title">البند الثالث: المقابل المالي وأسلوب الوفاء</div>
    <p>
      يلتزم الطرف الثاني بسداد الأتعاب والمستحقات المتفق عليها وفقاً لجدول الدفعات المعتمد، وتصدر المؤسسة إيصالات وفواتير رسمية مختومة برقم ضريبي معتمد لكافة المبالغ المسددة.
    </p>

    <div class="clause-title">البند الرابع: التزامات وحقوق الطرفين</div>
    <p>
      1. يلتزم الطرف الثاني بتقديم كافة الأصول والمستندات والبيانات الصحيحة اللازمة لمباشرة الإجراءات في المواعيد المقررة قانوناً.<br>
      2. يلتزم الطرف الأول بالحفاظ التام على سرية المعلومات والمستندات المسلمة إليه وعدم إفشائها طبقاً لميثاق الشرف المهني.<br>
      3. يتحمل كل طرف مسؤولية صحة البيانات والموطن المختار المذكور بصدر هذا العقد ما لم يُخطر الطرف الآخر كتابة بأي تعديل.
    </p>

    ${
      customClauses.length > 0
        ? customClauses
            .map(
              (clause, idx) => `
      <div class="clause-title">البند ${idx + 5}: شروط خاصة وإضافية</div>
      <p>${clause}</p>`
            )
            .join('')
        : `
    <div class="clause-title">البند الخامس: فض المنازعات والاختصاص القضائي</div>
    <p>
      يخضع هذا العقد ويفسر وفقاً للقوانين المصرية السارية، وفي حالة نشوء أي نزاع - لا قدر الله - حول تفسير أو تطبيق بنود هذا العقد، يكون الاختصاص القضائي منعقداً لمحاكم الجيزة الابتدائية والجزئية بحسب الاختصاص النوعي والقيمي.
    </p>
    `
    }

    <div class="clause-title">البند الختامي: نسخ العقد والاعتماد</div>
    <p>
      تحرر هذا العقد من نسختين أصليتين بيد كل طرف نسخة للعمل بموجبها عند اللزوم، وتعد هذه النسخة الإلكترونية مسودة تجريبية تم إعدادها بواسطة المنظومة الرقمية لمؤسسة أركان للمحاماة، وتكون نافذة بعد التوقيع وإثبات التاريخ أو التصديق الرسمي.
    </p>

    <!-- Signatures Table -->
    <table class="signatures-table">
      <tr>
        <td>
          <strong>الطرف الأول</strong><br>
          مؤسسة أركان للمحاماة والاستشارات<br>
          (التوقيع والختم المعتمد)<br><br><br>
          ..........................................
        </td>
        <td>
          <strong>الطرف الثاني</strong><br>
          <span class="fillable-field">${clientName}</span><br>
          (التوقيع والبصمة)<br><br><br>
          ..........................................
        </td>
      </tr>
    </table>

    <!-- Footer Note -->
    <div class="footer-note">
      تم إنشاء هذه الوثيقة آلياً عبر بوابة مؤسسة أركان للمحاماة والاستشارات القانونية والمحاسبية والضريبية.<br>
      المقر: 5ب أبراج الوطنية، آخر فيصل، قسم الهرم، الجيزة | هاتف: 01141754963 / 01551658173
    </div>

  </div>
</body>
</html>
`;

  // Download blob with application/msword MIME type
  const blob = new Blob(['\ufeff' + wordContent], {
    type: 'application/msword;charset=utf-8',
  });

  const sanitizedFileName = contractTitle.replace(/[/\\?%*:|"<>]/g, '_');
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = `${sanitizedFileName}_مؤسسة_أركان_نسخة_تجريبية.doc`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
  URL.revokeObjectURL(url);
}
