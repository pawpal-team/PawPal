INSERT INTO pets (
  user_id,
  name,
  species,
  breed,
  gender,
  birthday,
  age,
  weight,
  microchip_number,
  neutered,
  blood_type,
  fur_color,
  note,
  photo_url
)
SELECT
  users.id,
  pet.name,
  pet.species,
  pet.breed,
  pet.gender,
  pet.birthday,
  pet.age,
  pet.weight,
  pet.microchip_number,
  pet.neutered,
  pet.blood_type,
  pet.fur_color,
  pet.note,
  pet.photo_url
FROM (
  VALUES
    ('alice@example.com', 'Momo', 'Dog', 'Shiba Inu', 'Female', DATE '2021-03-15', 3, 8.20, '900138000000001', TRUE, 'DEA 1.1+', 'Red sesame', 'Friendly and loves walks.', NULL),
    ('bob@example.com', 'Luna', 'Cat', 'British Shorthair', 'Female', DATE '2020-11-02', 4, 4.80, '900138000000002', TRUE, 'A', 'Blue gray', 'Prefers quiet spaces.', NULL),
    ('carol@example.com', 'Oreo', 'Dog', 'Border Collie', 'Male', DATE '2019-07-21', 5, 16.50, '900138000000003', FALSE, 'DEA 1.1-', 'Black and white', 'High energy and smart.', NULL),
    ('david@example.com', 'Nana', 'Rabbit', 'Holland Lop', 'Female', DATE '2022-01-10', 2, 1.70, '900138000000004', FALSE, NULL, 'Cream', 'Needs regular dental checks.', NULL),
    ('emma@example.com', 'Tiger', 'Cat', 'Domestic Shorthair', 'Male', DATE '2018-09-30', 6, 5.30, '900138000000005', TRUE, 'B', 'Orange tabby', 'Enjoys window watching.', NULL)
) AS pet (
  owner_email,
  name,
  species,
  breed,
  gender,
  birthday,
  age,
  weight,
  microchip_number,
  neutered,
  blood_type,
  fur_color,
  note,
  photo_url
)
JOIN users ON users.email = pet.owner_email
ON CONFLICT (microchip_number) DO NOTHING;
