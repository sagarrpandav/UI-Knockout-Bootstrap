insert into category values (1,'Technology'),
                            (2,'Corporate'),
                            (3,'Operations'),
                            (4,'Human Resources'),
                            (5,'Finance'),
                            (6,'Domain');

insert into hackathon values  (1,'2018-06-18','Bolt 2018','Pune',3),
                              (2,'2017-05-25','Hackfest 2017','New York',3),
                              (3,'2016-03-17','Codeathon 2016','Chicago',1);

insert into idea values   (1,'Send placements along with the PO so the entire context is available as part of authorization flow.','Improve PO authorization flow',2,2,1,6),
                          (2,'Show the buy system actuals on flight within a media plan so that reconciled costs and KPIs are readily available.','Show Buy system actuals in media plan',2,2,1,6),
                          (3,'Enable Docker support for the product so that deployment costs are reduced.','Use containers for deployment',2,2,1,1);

insert into idea values   (4,'Send placements along with the PO so the entire context is available as part of authorization flow.','Improve PO authorization flow',2,2,2,6),
                          (5,'Show the buy system actuals on flight within a media plan so that reconciled costs and KPIs are readily available.','Show Buy system actuals in media plan',2,2,2,6),
                          (6,'Enable Docker support for the product so that deployment costs are reduced.','Use containers for deployment',2,2,2,1),
                          (7,'Dummy Idea Details','Dummy Idea Summary',5,2,3,2);


insert into member values (1,'Nishant',1),
                          (2,'Vineet',1),
                          (3,'Rajan',2),
                          (4,'Kirti',2),
                          (5,'Zubair',3),
                          (6,'Suyog',3),
                          (7,'Nisha',4),
                          (8,'Vin',4),
                          (9,'Raj',5),
                          (10,'Kurt',5),
                          (11,'Zuban',6),
                          (12,'Suraj',6),
                          (13,'Sagar',7),
                          (14,'Nitin',7);

insert into likes values  (1,1,1),
                          (2,1,2),
                          (3,2,3),
                          (4,2,2),
                          (5,3,1),
                          (6,3,2),
                          (7,4,1),
                          (8,4,2),
                          (9,5,1),
                          (10,5,2),
                          (11,6,1),
                          (12,6,2),
                          (13,7,1),
                          (14,7,2);