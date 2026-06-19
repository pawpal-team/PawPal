TRUNCATE TABLE medical_records RESTART IDENTITY CASCADE;

INSERT INTO medical_records (
  pet_id,
  record_type,
  hospital_name,
  title,
  record_date,
  symptoms,
  diagnosis,
  prescription
)
SELECT
  pets.id,
  record.record_type,
  record.hospital_name,
  record.title,
  record.record_date,
  record.symptoms,
  record.diagnosis,
  record.prescription
FROM (
  VALUES
    ('Momo', '疫苗', 'ABC動物醫院', '年度核心疫苗施打', DATE '2026-05-01', NULL, '健康狀況良好，施打十合一疫苗', '無'),
    ('Momo', '體檢', 'ABC動物醫院', '例行性體重與心絲蟲檢查', DATE '2026-02-14', '例行檢查', '體重 8.2kg 正常，四級心絲蟲檢驗陰性', '預防藥一盒'),

    ('Luna', '看診', '幸福動物醫院', '眼睛發炎微腫', DATE '2026-06-05', '右眼流淚、頻繁眨眼、有些微分泌物', '結膜炎', '眼藥水（每日三次）'),

    ('Oreo', '用藥', '毛孩醫院', '皮膚過敏藥浴', DATE '2026-03-12', '腹部與四肢紅腫、頻繁搔抓', '過敏性皮膚炎', '異位性皮膚炎外用藥膏、藥浴洗劑'),
  
    ('Nana', '看診', '幸福動物醫院', '腸胃不適複診', DATE '2026-04-08', '食慾下降，糞便形狀變小', '輕微胃腸道停滯 (GI Stasis)', '腸胃蠕動藥、益生菌、草粉補充'),
    ('Nana', '疫苗', '毛孩動物醫院', '年度兔瘟疫苗施打', DATE '2025-11-20', NULL, '健康狀況良好，施打兔瘟疫苗', '無'),

    ('Tiger', '看診', '安心動物醫院', '皮膚紅腫回診', DATE '2026-06-13', '腹部有紅疹，持續搔抓', '疑似過敏性皮膚炎', '抗生素、止癢藥'),
    ('Tiger', '體檢', '汪喵專科醫院', '年度健康血檢', DATE '2026-03-15', '健檢抽血', '各項肝腎數值正常，體重 5.3kg 稍胖需控制', '無')

) AS record (
  pet_name, 
  record_type,
  hospital_name,
  title,
  record_date,
  symptoms,
  diagnosis,
  prescription
)

JOIN pets ON pets.name = record.pet_name;


