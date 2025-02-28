INSERT INTO department (id, name)
VALUES (1, Graphic Design),
       (2, Video Game Development),
       (3, Voice Actors),
       (4, Script/Story Writers),
       (5, Debugging/Testing),
       (6, Testers/reviewers),
       (7, Administration),
       (8, Accounting),
       (9, Legal),
       (10, Management);

INSERT INTO role (id, title, salary, department_id)
VALUES (1, Graphic Designer, 80000, 1),
       (2, Video Game Developer, 80000, 2),
       (3, Voice Actor, 60000, 3),
       (4, Script Writer, 70000, 4),
       (5, Tester, 40000, 5),
       (6, Reviewer, 45000, 6),
       (7, Administrator, 60000, 7),
       (8, Accountant, 70000, 8),
       (9, Lawyer, 80000, 9),
       (10, Manager, 100000, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, John, Doe, 1),
       (2, Jane, Doe, 2),
       (3, John, Smith, 3, NULL),
       (4, Jane, Smith, 4),
       (5, John, Johnson, 5),
       (6, Jane, Johnson, 6),
       (7, John, Williams, 7, NULL),
       (8, Jane, Williams, 8),
       (9, John, Brown, 9),
       (10, Jane, Brown, 10, NULL);