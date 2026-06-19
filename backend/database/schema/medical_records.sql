CREATE TABLE IF NOT EXISTS medical_records (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  record_type VARCHAR(50) NOT NULL,
  hospital_name VARCHAR(100),
  title VARCHAR(200) NOT NULL,
  record_date DATE NOT NULL,
  symptoms TEXT,
  diagnosis TEXT,
  prescription TEXT,
  image_url TEXT[],
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_medical_records_pet
    FOREIGN KEY (pet_id)
    REFERENCES pets(id)
);

