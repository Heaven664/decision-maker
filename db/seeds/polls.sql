INSERT INTO polls (email, title, description, admin_link, vote_link) VALUES ('randomemail1@mail.com', 'WHICH MOVIE?', 'I CAN''T CHOSE MYSELF', 'https://www.adminlink1.com', 'https://www.votelink1.com');
INSERT INTO polls (email, title, description, admin_link, vote_link) VALUES ('randomemail2@mail.com', 'WHICH SONG?', 'I CAN''T CHOSE MYSELF', 'https://www.adminlink2.com', 'https://www.votelink2.com');

INSERT INTO options (poll_id, title, description) VALUES (1, 'The Hobbit', 'FANTASY');
INSERT INTO options (poll_id, title, description) VALUES (1, 'The Truman Show', 'COMEDY');
INSERT INTO options (poll_id, title, description) VALUES (1, 'Iron Man', 'Action movie');

INSERT INTO options (poll_id, title, description) VALUES (2, 'Goodfellas', 'Mafia movie');
INSERT INTO options (poll_id, title, description) VALUES (2, 'No country for old men', 'Detective');
INSERT INTO options (poll_id, title, description) VALUES (2, 'The Shawshank Redemption', 'Drama');

INSERT INTO rankings (option_id, voter_name, rank) VALUES (1, 'Alex', 1);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (2, 'Alex', 3);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (3, 'Alex', 2);

INSERT INTO rankings (option_id, voter_name, rank) VALUES (1, 'Jong', 3);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (2, 'John', 2);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (3, 'John', 1);

INSERT INTO rankings (option_id, voter_name, rank) VALUES (1, 'Ann', 1);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (2, 'Ann', 2);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (3, 'Ann', 3);

INSERT INTO rankings (option_id, voter_name, rank) VALUES (4, 'Alex', 1);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (5, 'Alex', 3);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (6, 'Alex', 2);

INSERT INTO rankings (option_id, voter_name, rank) VALUES (4, 'Jong', 3);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (5, 'John', 2);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (6, 'John', 1);

INSERT INTO rankings (option_id, voter_name, rank) VALUES (4, 'Ann', 1);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (5, 'Ann', 2);
INSERT INTO rankings (option_id, voter_name, rank) VALUES (6, 'Ann', 3);
