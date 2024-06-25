CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, created_at) VALUES
('Cook Dinner', 'Prepare and cook dinner for the family', 'pending', '2024-06-01 18:00:00'),
('Morning Jog', 'Complete a 30-minute jog in the park', 'in progress', '2024-06-02 07:00:00'),
('Clean the Garage', 'Organize and clean the garage', 'completed', '2024-06-03 10:00:00'),
('Bake a Cake', 'Bake a chocolate cake for the birthday party', 'pending', '2024-06-04 14:00:00'),
('Soccer Practice', 'Attend soccer practice at the local field', 'in progress', '2024-06-05 17:00:00'),
('Wash the Car', 'Wash and wax the car in the driveway', 'completed', '2024-06-06 11:00:00'),
('Grocery Shopping', 'Buy groceries for the week', 'pending', '2024-06-07 16:00:00'),
('Tennis Match', 'Play a doubles tennis match at the club', 'in progress', '2024-06-08 09:00:00'),
('Mow the Lawn', 'Mow the front and backyard lawn', 'completed', '2024-06-09 08:00:00'),
('Prepare Breakfast', 'Make breakfast for the family', 'pending', '2024-06-10 07:30:00'),
('Basketball Game', 'Play a basketball game with friends', 'in progress', '2024-06-11 19:00:00'),
('Laundry', 'Wash, dry, and fold clothes', 'completed', '2024-06-12 13:00:00');


