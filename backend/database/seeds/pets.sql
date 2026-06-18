INSERT INTO pets (
  user_id,
  name,
  species,
  breed,
  gender,
  birthday,
  weight,
  microchip_number,
  neutered,
  blood_type,
  fur_color,
  notes,
  avatar_url
)
SELECT
  users.id,
  pet.name,
  pet.species,
  pet.breed,
  pet.gender,
  pet.birthday,
  pet.weight,
  pet.microchip_number,
  pet.neutered,
  pet.blood_type,
  pet.fur_color,
  pet.notes,
  pet.avatar_url
FROM (
  VALUES
    ('alice@example.com', 'Momo', 'Dog', 'Shiba Inu', 'Female', DATE '2021-03-15', 8.20, '900138000000001', TRUE, 'DEA 1.1+', 'Red sesame', 'Friendly and loves walks.', NULL),
    ('bob@example.com', 'Luna', 'Cat', 'British Shorthair', 'Female', DATE '2020-11-02', 4.80, '900138000000002', TRUE, 'A', 'Blue gray', 'Prefers quiet spaces.', NULL),
    ('carol@example.com', 'Oreo', 'Dog', 'Border Collie', 'Male', DATE '2019-07-21', 16.50, '900138000000003', FALSE, 'DEA 1.1-', 'Black and white', 'High energy and smart.', NULL),
    ('david@example.com', 'Nana', 'Rabbit', 'Holland Lop', 'Female', DATE '2022-01-10', 1.70, '900138000000004', FALSE, NULL, 'Cream', 'Needs regular dental checks.', NULL),
    ('emma@example.com', 'Tiger', 'Cat', 'Domestic Shorthair', 'Male', DATE '2018-09-30', 5.30, '900138000000005', TRUE, 'B', 'Orange tabby', 'Enjoys window watching.', NULL)
) AS pet (
  owner_email,
  name,
  species,
  breed,
  gender,
  birthday,
  weight,
  microchip_number,
  neutered,
  blood_type,
  fur_color,
  notes,
  avatar_url
)
JOIN users ON users.email = pet.owner_email
ON CONFLICT (microchip_number) DO NOTHING;
