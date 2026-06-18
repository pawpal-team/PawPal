CREATE TABLE IF NOT EXISTS pets (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(100),
  gender VARCHAR(20),
  birthday DATE,
  weight NUMERIC(5,2) CHECK (weight >= 0),
  microchip_number VARCHAR(50) UNIQUE,
  neutered BOOLEAN NOT NULL DEFAULT FALSE,
  blood_type VARCHAR(20),
  fur_color VARCHAR(100),
  notes TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pets_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);
