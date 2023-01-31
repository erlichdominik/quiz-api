create sequence APP_USER_SEQ start 101;

insert into app_user(id, email, password, first_recovery_answer, second_recovery_answer) values (1, 'admin', '$2a$10$bD45TIkBkCqdYfLI49RSyO/5QaxzOGUPMuKn0pupceFXIpIEuZvnK', 'admin', 'admin')
insert into app_user(id, email, password, first_recovery_answer, second_recovery_answer) values (2, 't', '$2a$10$KMmN25KQOMf7H6suM2u7yOTN.yZroj1J7CzrshB.LFge9Imk38tqu', 't', 't')
insert into app_user(id, email, password, first_recovery_answer, second_recovery_answer) values (3, 's', '$2a$10$HbaCrvWCLgCtgsKyZD7X1e00bw0LoQZQNXUd88O0APPPd.yTRiBKC', 's', 's')

insert into ROLE(id, name) values (1, 'STUDENT')
insert into ROLE(id, name) values (2, 'TEACHER')
insert into ROLE(id, name) values (3, 'ADMIN')

insert into users_roles(user_id, roles_id) values (1, 3)
insert into users_roles(user_id, roles_id) values (2, 2)
insert into users_roles(user_id, roles_id) values (3, 1)

insert into QUIZ(id, name) values (1, 'default')
-- insert into QUIZ(id, category) values (2, 'easy')
-- insert into quiz (id, category) values ('fed1de10-5d35-11ed-a94e-4d3f065c0f7x', 'easy')
-- insert into quiz (id, category) values ('fed1de10-5d35-11ed-a94e-4d3f065c0f7d', 'hard')

insert into pathway (id, pathway_number, next_pathway_number, pathway_name, quiz_id) values (1, 1, 2, 'pathway1', 1 )
-- insert into pathway (id, pathway_number, next_pathway_number, pathway_name, quiz_id) values (3, 3, null, 'final pathway', 1)

-- pathway 1
insert into question(id, comment, text, pathway_id, subpathway_id) values (1, 'lorem', 'Mięśnie gładkie większości naczyć unerwiane są przez', 1, null)

insert into answer(id, text, is_true, question_id) values(1, 'Wyłącznie układ współczulny', true, 1)
insert into answer(id, text, is_true, question_id) values(2, 'Wyłącznie układ przywspółczulny', false, 1)
insert into answer(id, text, is_true, question_id) values(3, 'Oba układy razem', false, 1)

insert into subpathway(id, pathway_id) values (1, 1)

-- subpathway 1's questions
insert into question(id, comment, text, pathway_id, subpathway_id) values (2, 'lorem', 'Mięśnie gładkie tętnic posiadają receptory', null, 1)

insert into answer(id, text, is_true, question_id) values(4, 'alfa 1 i beta 2', true, 2)
insert into answer(id, text, is_true, question_id) values(5, 'alfa 2 i beta 1', false, 2)
insert into answer(id, text, is_true, question_id) values(6, 'beta 1 i beta 2', false, 2)

insert into question(id, comment, text, pathway_id, subpathway_id) values (3, 'lorem', 'Zaznacz efekt pobudzenia receptorów alfa 1 i beta 2', null, 1)

insert into answer(id, text, is_true, question_id) values(7, 'alfa 1 powoduje wzrost napięcia mięsni gładkich tętnic, beta 2 spadek ich napięcia', true, 3)
insert into answer(id, text, is_true, question_id) values(8, 'alfa 1 powoduje wzrost napięcia mięsni gładkich tętnic, beta 2 także wzrost ich napięcia', false, 3)
insert into answer(id, text, is_true, question_id) values(9, 'alfa 1 powoduje spadek napięcia mięsni gładkich tętnic, beta 2 wzrost ich napięcia', false, 3)


insert into question(id, comment, text, pathway_id, subpathway_id) values (4, 'lorem', 'Skutkiem pobudzenia receptorów alfa 1 i beta 2 jest', null, 1)

insert into answer(id, text, is_true, question_id) values(10, 'Wzrost napięcia mm gładkich i zweżenie średnic tętnic', true, 4)
insert into answer(id, text, is_true, question_id) values(11, 'Spadek napięcia mm gładkich i zwiekszenie średnic tętnic', false, 4)
insert into answer(id, text, is_true, question_id) values(12, 'Utrzymanie dotychczasowego napięcia i średnic tętnic', false, 4)

insert into question(id, comment, text, pathway_id, subpathway_id) values (5, 'lorem', 'Efektem wzrostu napięcia mm gładkich i zweżenia średnic tętnic jest', null, 1)

insert into answer(id, text, is_true, question_id) values(13, 'wzrost TPR', true, 5)
insert into answer(id, text, is_true, question_id) values(14, 'spadek TPR', false, 5)
insert into answer(id, text, is_true, question_id) values(15, 'nie wpływa na TPR', false, 5)

insert into question(id, comment, text, pathway_id, subpathway_id) values (6, 'lorem', 'Wzrost TPR spowoduje', null, 1)

insert into answer(id, text, is_true, question_id) values(16, 'Wzrost MAP', true, 6)
insert into answer(id, text, is_true, question_id) values(17, 'Spadek MAP', false, 6)
insert into answer(id, text, is_true, question_id) values(18, 'nie ma wpływu na MAP', false, 6)

insert into subpathway(id, pathway_id) values (2, 1)

insert into question(id, comment, text, pathway_id, subpathway_id) values (7, 'lorem', 'Mieśnie gładkie żył posiadają receptory', null, 2)

insert into answer(id, text, is_true, question_id) values(19, 'alfa 1', true, 7)
insert into answer(id, text, is_true, question_id) values(20, 'beta 2', false, 7)
insert into answer(id, text, is_true, question_id) values(21, 'beta 2', false, 7)

insert into question(id, comment, text, pathway_id, subpathway_id) values (8, 'lorem', 'Zaznacz efekt pobudzenia receptorów alfa 1', null, 2)

insert into answer(id, text, is_true, question_id) values(22, 'Wzrost napięcia mm gładkich i zweżenie średnic żył', false, 8)
insert into answer(id, text, is_true, question_id) values(23, 'Wzrost napięcia mm gładkich i zmniejszenie podatności ścian naczyń żylnych', true, 8)
insert into answer(id, text, is_true, question_id) values(24, 'Spadek napięcia mm gładkich i zwiększenie podatności ścian naczyń żylnych', false, 8)

insert into question(id, comment, text, pathway_id, subpathway_id) values (9, 'lorem', 'Efektem zmniejszenie podatności ścian naczyń żylnych', null, 2)

insert into answer(id, text, is_true, question_id) values(25, 'Wzrost ciśnienia w żyłach obwodowych', true, 9)
insert into answer(id, text, is_true, question_id) values(26, 'Spadek ciśnienia w żyłach obwodowych', false, 9)
insert into answer(id, text, is_true, question_id) values(27, 'Utrzymanie dotychczasowego ciśnienia w żyłach', false, 9)

insert into question(id, comment, text, pathway_id, subpathway_id) values (10, 'lorem', 'Wzrost ciśnienia w żyłach obwodowych spowoduje', null, 2)

insert into answer(id, text, is_true, question_id) values(28, 'Spadek powrotu żylnego', false, 10)
insert into answer(id, text, is_true, question_id) values(29, 'Wzrost powrotu żylnego', true, 10)
insert into answer(id, text, is_true, question_id) values(30, 'Nie wpłynie na wielkośc poworotu żylnego', false, 10)

insert into question(id, comment, text, pathway_id, subpathway_id) values (11, 'lorem', 'Wzrost powrotu żylnego', null, 2)

insert into answer(id, text, is_true, question_id) values(31, 'Zwiększa ciśnienie w PP', true, 11)
insert into answer(id, text, is_true, question_id) values(32, 'Zmniejsza ciśnienie w PP', false, 11)
insert into answer(id, text, is_true, question_id) values(33, 'Nie ma wpływu na ciśnienie w PP', false, 11)

insert into question(id, comment, text, pathway_id, subpathway_id) values (12, 'lorem', 'Wzrost ciśnienia w PP powoduje', null, 2)

insert into answer(id, text, is_true, question_id) values(34, 'Zwiększenie objętności późnorozkurczowej serca', true, 12)
insert into answer(id, text, is_true, question_id) values(35, 'Zmniejszenie objętności późnorozkurczowej serca', false, 12)
insert into answer(id, text, is_true, question_id) values(36, 'Zmniejszenie szybkości skurczu komór serca', false, 12)

insert into question(id, comment, text, pathway_id, subpathway_id) values (13, 'lorem', 'Wpływ objętości późnorozkurczowej na siłe skurczu opisuje', null, 2)

insert into answer(id, text, is_true, question_id) values(37, 'Prawo Franka-Starlinga', true, 13)
insert into answer(id, text, is_true, question_id) values(38, 'Prawo Laplace''a', false, 13)
insert into answer(id, text, is_true, question_id) values(39, 'Prawo Hilla', false, 13)

insert into question(id, comment, text, pathway_id, subpathway_id) values (14, 'lorem', 'Zgodnie z prawem Franka-Starlinga wzrost objętości późnorozkurczowej skutkuje ', null, 2)

insert into answer(id, text, is_true, question_id) values(40, 'Wzrostem objętosi wyrzutowej serca', true, 14)
insert into answer(id, text, is_true, question_id) values(41, 'Spadkiem objętości wyrzutowej serca', false, 14)
insert into answer(id, text, is_true, question_id) values(42, 'Wzrostem kurczliwości mięśni roboczych komór', false, 14)

insert into question(id, comment, text, pathway_id, subpathway_id) values (15, 'lorem', 'Zwiększenie objętości wyrzutowej serca powoduje wzrost', null, 2)

insert into answer(id, text, is_true, question_id) values(43, 'CO', true, 15)
insert into answer(id, text, is_true, question_id) values(44, 'HR', false, 15)
insert into answer(id, text, is_true, question_id) values(45, 'TPR', false, 15)

insert into question(id, comment, text, pathway_id, subpathway_id) values (16, 'lorem', 'Wzrost CO powoduje', null, 2)

insert into answer(id, text, is_true, question_id) values(46, 'Wzrost MAP', true, 16)
insert into answer(id, text, is_true, question_id) values(47, 'Spadek MAP', false, 16)
insert into answer(id, text, is_true, question_id) values(48, 'utrzymanie MAP na dotychczasowym poziomie', false, 16)

-- -- pathway 2
insert into pathway (id, pathway_number, next_pathway_number, pathway_name, quiz_id) values (2, 2, 3, 'pathway2', 1)

insert into question(id, comment, text, pathway_id, subpathway_id) values (17, 'lorem', 'Komórki robocze komór serca unerwiane są przez', 2, null)

insert into answer(id, text, is_true, question_id) values(49, 'wyłącznie układ współczulny', true, 17)
insert into answer(id, text, is_true, question_id) values(50, 'wyłącznie układ przywspółczulny', false, 17)
insert into answer(id, text, is_true, question_id) values(51, 'oba układy razem', false, 17)

--
insert into subpathway(id, pathway_id) values (3, 2)
--
insert into question(id, comment, text, pathway_id, subpathway_id) values(18, 'lorem', 'Jednym z wpływów na komórki robocze jest', null, 3)
--
insert into answer(id, text, is_true, question_id) values(52, 'efekt lusitropowy', true, 18)
insert into answer(id, text, is_true, question_id) values(53, 'efekt batmotropowy', false, 18)
insert into answer(id, text, is_true, question_id) values(54, 'efekt dromotropowy', false, 18)
--
insert into question(id, comment, text, pathway_id, subpathway_id) values (19, 'lorem', 'Podstawa efektu lusitropowego to:', null, 3)
--
insert into answer(id, text, is_true, question_id) values (55, 'Szybkość uwalniania Ca 2+ z siateczki', true, 19)
insert into answer(id, text, is_true, question_id) values (56, 'Szybkość usuwania Ca 2+ z przestrzeni komórkowej przez pompę wapniową', false, 19)
insert into answer(id, text, is_true, question_id) values (57, 'Szybkość działania pompy sodowo-potasowej', false, 19)
--
insert into question(id, comment, text, pathway_id, subpathway_id) values (20, 'lorem', 'Skutekiem efektu lusitropowego jest ', null, 3)
--
insert into answer(id, text, is_true, question_id) values (58, 'Zwiększenie podatności mięśnia sercowego na rozciąganie', true, 20)
insert into answer(id, text, is_true, question_id) values (59, 'wzrost szybkości przewodzenia w układzie bodźco-przewodzącym', false, 20)
insert into answer(id, text, is_true, question_id) values (60, 'wzrost kurczliwości mięśnia sercowego', false, 20)

insert into question(id, comment, text, pathway_id, subpathway_id) values (21, 'lorem', 'Zwiększenie podatności mięśnia sercowego na rozciąganie skutkuje', null, 3)

insert into answer(id, text, is_true, question_id) values (61, 'zwiększeniem objętości późnorozkurczowej komory', true, 21)
insert into answer(id, text, is_true, question_id) values (62, 'zmniejszenia objętości późnoskurczowej komory', false, 21)
insert into answer(id, text, is_true, question_id) values (63, 'znacznym i szybkim wzrostem ciśnienia późnorozkurczowego', false, 21)

insert into question(id, comment, text, pathway_id, subpathway_id) values (22, 'lorem', 'Wpływ objętości późnorozkurczowej na siłe skurczu opisuje ', null, 3)

insert into answer(id, text, is_true, question_id) values (64, 'Prawo Franka-Starlinga', true, 22)
insert into answer(id, text, is_true, question_id) values (65, 'Prawo Laplace''a', false, 22)
insert into answer(id, text, is_true, question_id) values (66, 'Prawo Hilla', false, 22)

insert into question(id, comment, text, pathway_id, subpathway_id) values (23, 'lorem', 'Regulacją heretometryczna (prawo Franka-Starlinga) prowadzi do ', null, 3)

insert into answer(id, text, is_true, question_id) values (67, 'Wzrostu siły skurczu mięsnia sercowego', true, 23)
insert into answer(id, text, is_true, question_id) values (68, 'Spadku objętości wyrzutowej serca', false, 23)
insert into answer(id, text, is_true, question_id) values (69, 'Wzrostu kurczliwości mięśni roboczych komór', false, 23)

insert into question(id, comment, text, pathway_id, subpathway_id) values (24, 'lorem', 'Następstwemw wzrostu siły skurczu mięsnia sercowego jest', null, 3)

insert into answer(id, text, is_true, question_id) values (70, 'wzrost objętości wyrzutowej', true, 24)
insert into answer(id, text, is_true, question_id) values (71, 'wzrost częstości skórczów serca', false, 24)
insert into answer(id, text, is_true, question_id) values (72, 'wzrost szybkości przewodzenia w węzlie przedsionkowo-komorowym', false, 24)

insert into question(id, comment, text, pathway_id, subpathway_id) values (25, 'lorem', 'Zwiększenie objętości wyrzutowej serca powoduje wzrost', null, 3)
insert into answer(id, text, is_true, question_id) values (73, 'CO', true, 25)
insert into answer(id, text, is_true, question_id) values (74, 'HR', false, 25)
insert into answer(id, text, is_true, question_id) values (75, 'TPR', false, 25)

insert into question(id, comment, text, pathway_id, subpathway_id) values (26, 'lorem', 'Wzrost CO bez zmian innych parametrów hemodynamicznych prowadzi do', null, 3)

insert into answer(id, text, is_true, question_id) values (76, 'Wzrostu MAP', true, 26)
insert into answer(id, text, is_true, question_id) values (77, 'Spadku MAP', false, 26)
insert into answer(id, text, is_true, question_id) values (78, 'utrzymanie MAP na dotychczasowym poziomie', false, 26)

insert into subpathway(id, pathway_id) values (4, 2)

insert into question(id, comment, text, pathway_id, subpathway_id) values (27, 'lorem', 'Efekt inortopowy dodatni jest wywoływany w skutek pobudzenia ', null, 4)

insert into answer(id, text, is_true, question_id) values (79, 'receptorów beta1 kardiomiocytów roboczych komór', true, 27)
insert into answer(id, text, is_true, question_id) values (80, 'receptorów M2 kardiomiocytów roboczych komór', false, 27)
insert into answer(id, text, is_true, question_id) values (81, 'receptorów alfa 2 kardiomiocytów roboczych komór', false, 27)

insert into question(id, comment, text, pathway_id, subpathway_id) values (28, 'lorem', 'Podstawą efektu inotropowiego dodatniego jest', null, 4)

insert into answer(id, text, is_true, question_id) values (82, 'wzrost stężenia jonów Ca2+ w kardiomiocytach roboczych', true, 28)
insert into answer(id, text, is_true, question_id) values (83, 'wzrost długości kardiomiocytów roboczych', false, 28)
insert into answer(id, text, is_true, question_id) values (84, 'fosforylacja fosfolambanu pompy wapniowej SERCA', false, 28)

insert into question(id, comment, text, pathway_id, subpathway_id) values (29, 'lorem', 'wzrost stężenia jonów Ca2+ w kardiomiocytach roboczych skutkuje', null, 4)

insert into answer(id, text, is_true, question_id) values (85, 'wzrostem kurczliwości mięsnia sercowego komór', true, 29)
insert into answer(id, text, is_true, question_id) values (86, 'wzrostem obciążenia wztępnego komor', false, 29)
insert into answer(id, text, is_true, question_id) values (87, 'wzrostem obciążenia następczego komór', false, 29)

insert into question(id, comment, text, pathway_id, subpathway_id) values (30, 'lorem', 'Wpływ na kurczliwość mięśnia sercowego jest nazywany', null, 4)

insert into answer(id, text, is_true, question_id) values (88, 'regulacją homeometryczną ', true, 30)
insert into answer(id, text, is_true, question_id) values (89, 'regulacją heterometryczną', false, 30)
insert into answer(id, text, is_true, question_id) values (90, 'regulacją dromotropową', false, 30)

insert into question(id, comment, text, pathway_id, subpathway_id) values (31, 'lorem', 'wzrost kurczliwości mięśnia sercowego prowadzi do', null, 4)

insert into answer(id, text, is_true, question_id) values (91, 'wzrostu siły skurczu mięśnia sercowego', true, 31)
insert into answer(id, text, is_true, question_id) values (92, 'wzrostu objętości późnoskurczowej komór', false, 31)
insert into answer(id, text, is_true, question_id) values (93, 'spadku objętości późnorozkurczowej komór', false, 31)

insert into question(id, comment, text, pathway_id, subpathway_id) values (32, 'lorem', 'Następstwem wzrostu siły skurczu mięsnia sercowego jest', null, 4)

insert into answer(id, text, is_true, question_id)  values (94, 'wzrost objętości wyrzutowej', true, 32)
insert into answer(id, text, is_true, question_id) values (95, 'wzrost częstości skórczów serca', false, 32)
insert into answer(id, text, is_true, question_id) values (96, 'wzrost szybkości przewodzenia w węzlie przedsionkowo-komorowym', false, 32)

insert into question(id, comment, text, pathway_id, subpathway_id) values (33, 'lorem', 'Zwiększenie objętości wyrzutowej serca powoduje wzrost', null, 4)

insert into answer(id, text, is_true, question_id) values (97, 'CO', true, 33)
insert into answer(id, text, is_true, question_id) values (98, 'HR', false, 33)
insert into answer(id, text, is_true, question_id) values (99, 'TPR', false, 33)

insert into question(id, comment, text, pathway_id, subpathway_id) values (34, 'lorem', 'Wzrost CO powoduje', null, 4)

insert into answer(id, text, is_true, question_id) values (100, 'Wzrost MAP', true, 34)
insert into answer(id, text, is_true, question_id) values (101, 'Spadek MAP', false, 34)
insert into answer(id, text, is_true, question_id) values (102, 'utrzymanie MAP na dotychczasowym poziomie', false, 34)

-- PATHWAY 3

insert into pathway (id, pathway_number, next_pathway_number, pathway_name, quiz_id) values (3, 3, null, 'pathway3', 1)

insert into question(id, comment, text, pathway_id, subpathway_id) values (35, 'lorem', 'Układ bodźcoprzewodzący serca unerwiany jest przez', 3, null)

insert into answer(id, text, is_true, question_id) values (103, 'wyłącznie układ współczulny', false, 35)
insert into answer(id, text, is_true, question_id) values (104, 'wyłącznie układ przywspółczulny', false, 35)
insert into answer(id, text, is_true, question_id) values (105, 'oba układy razem', true, 35)

insert into subpathway(id, pathway_id) values (5, 3)

insert into question(id, comment, text, pathway_id, subpathway_id) values (36, 'lorem', 'Wzrost aktywności współczulnej prowadzi do', null, 5)

insert into answer(id, text, is_true, question_id) values (106, 'pobudzenia receotirów beta1 komórek układu b.p.', true, 36)
insert into answer(id, text, is_true, question_id) values (107, 'pobudzenia receptorów M1 komórek układu b.p.', false, 36)
insert into answer(id, text, is_true, question_id) values (108, 'pobudzenia receptorów M2 komórek układu b.p.', false, 36)

insert into question(id, comment, text, pathway_id, subpathway_id) values (37, 'lorem', 'Efektem pobudzenia receptorów beta 1 komórek układu B.p serca jest', null, 5)

insert into answer(id, text, is_true, question_id) values (109, 'efekt chrono- i dromotropowy dodatni', true, 37)
insert into answer(id, text, is_true, question_id) values (110, 'efekt chronotorpowy dodatni i batmotropowy ujemny', false, 37)
insert into answer(id, text, is_true, question_id) values (111, 'efekt chrono- i lusitropowy dodatni', false, 37)

insert into question(id, comment, text, pathway_id, subpathway_id) values (38, 'lorem', 'Bezpośrednim skutkiem efektu chrono- i dromotropowego dodatniego jest', null, 5)

insert into answer(id, text, is_true, question_id) values (112, 'wzrost HR', true, 38)
insert into answer(id, text, is_true, question_id) values (113, 'wzrost SV', false, 38)
insert into answer(id, text, is_true, question_id) values (114, 'wzrost TPR', false, 38)

insert into question(id, comment, text, pathway_id, subpathway_id) values (39, 'lorem', 'Gdy rośnie HR bez towarzyszących temu zmian innych parametrów hemodynamicznych', null, 5)

insert into answer(id, text, is_true, question_id) values (115, 'rośnie CO', true, 39)
insert into answer(id, text, is_true, question_id) values (116, 'rośnie TPR', false, 39)
insert into answer(id, text, is_true, question_id) values (117, 'rośnie ciśnienie w prawym przedsionku', false, 39)

insert into question(id, comment, text, pathway_id, subpathway_id)values (40, 'lorem', 'Wzrost CO bez towarzyszących temu zmian innych parametrów hemodynamicznych powoduje', null, 5)

insert into answer(id, text, is_true, question_id) values (118, 'Wzrost MAP', true, 40)
insert into answer(id, text, is_true, question_id) values (119, 'Spadek MAP', false, 40)
insert into answer(id, text, is_true, question_id) values (120, 'utrzymanie MAP na dotychczasowym poziomie', false, 40)

insert into subpathway(id, pathway_id) values (6, 3)

insert into question(id, comment, text, pathway_id, subpathway_id) values (41, 'lorem', 'Wzrost aktywności przywspółczulnej prowadzi do', null, 6)

insert into answer(id, text, is_true, question_id) values (121, 'pobudzenia receotirów beta1 komórek układu b.p.', true, 41)
insert into answer(id, text, is_true, question_id) values (122, 'pobudzenia receptorów M1  komórek układu b.p.', false, 41)
insert into answer(id, text, is_true, question_id) values (123, 'pobudzenia receptorów M2  komórek układu b.p.', false, 41)

insert into question(id, comment, text, pathway_id, subpathway_id) values (42, 'lorem', 'Efektem pobudzenia receptorów M2 komórek układu B.p serca jest', null, 6)

insert into answer(id, text, is_true, question_id) values (124, 'efekt chrono- i lusitropowy dodatni', true, 42)
insert into answer(id, text, is_true, question_id) values (125, 'efekt chronotorpowy dodatni i batmotropowy ujemny', false, 42)
insert into answer(id, text, is_true, question_id) values (126, 'efekt chrono- i dromotropowy ujemny', false, 42)

insert into question(id, comment, text, pathway_id, subpathway_id) values (43, 'lorem', 'Bezpośrednim skutkiem efektu chrono- i dromotropowego ujemnego jest', null, 6)

insert into answer(id, text, is_true, question_id) values (127, 'spadek HR', true, 43)
insert into answer(id, text, is_true, question_id) values (128, 'spadek SV', false, 43)
insert into answer(id, text, is_true, question_id) values (129, 'spadek TPR', false, 43)

insert into question(id, comment, text, pathway_id, subpathway_id) values (44, 'lorem', 'Bezpośrednim skutkiem spadku HR bez towarzyszących temu zmian innych parametrów hemodynamicznych', null, 6)


insert into answer(id, text, is_true, question_id) values (130, 'wzrost MAP', true, 44)
insert into answer(id, text, is_true, question_id) values (131, 'spadek CO', false, 44)
insert into answer(id, text, is_true, question_id) values (132, 'spadek ciśnienia w prawym przedsionku', false, 44)

insert into question(id, comment, text, pathway_id, subpathway_id) values (45, 'lorem', 'Spadek CO bez towarzyszących temu zmian innych parametrów hemodynamicznych powoduje', null, 6)

insert into answer(id, text, is_true, question_id) values (133, 'Spadek MAP', true, 45)
insert into answer(id, text, is_true, question_id) values (134, 'Wzrost MAP', false, 45)
insert into answer(id, text, is_true, question_id) values (135, 'utrzymanie MAP na dotychczasowym poziomie', false, 45)

insert into category(id, category, locale) values (1, 'Helpful abbreviations', 'EN')
insert into category(id, category, locale) values (2, 'Basic hearth parameters', 'EN')
insert into category(id, category, locale) values (3, 'Arteries', 'EN')
insert into category(id, category, locale) values (4, 'Veins', 'EN')
insert into category(id, category, locale) values (5, 'Cardiomyocytes', 'EN')
insert into category(id, category, locale) values (6, 'Conducting system', 'EN')
insert into category(id, category, locale) values (7, 'Right atrial pressure', 'EN')
insert into category(id, category, locale) values (8, 'Venous return', 'EN')
insert into category(id, category, locale) values (9, 'Laplace''s law', 'EN')
insert into category(id, category, locale) values (10, 'Frank-Starling law', 'EN')
insert into category(id, category, locale) values (11, 'Adjusting the contraction strength of the heart mm', 'EN')
insert into category(id, category, locale) values (12, 'Selected autonomic receptors', 'EN')

insert into category(id, category, locale) values (13, 'Przydatne skróty', 'PL')
insert into category(id, category, locale) values (14, 'Podstawowe parametry pracy serca', 'PL')
insert into category(id, category, locale) values (15, 'Tętnice', 'PL')
insert into category(id, category, locale) values (16, 'Żyły', 'PL')
insert into category(id, category, locale) values (17, 'Kardiomiocyty', 'PL')
insert into category(id, category, locale) values (18, 'Układ bodźcoprzewodzący', 'PL')
insert into category(id, category, locale) values (19, 'Ciśnienie w prawym przedsionku', 'PL')
insert into category(id, category, locale) values (20, 'Powrót żylny', 'PL')
insert into category(id, category, locale) values (21, 'Prawo Laplace', 'PL')
insert into category(id, category, locale) values (22, 'Prawo Franka-Starlinga', 'PL')
insert into category(id, category, locale) values (23, 'Regulacja siły skurczu mm sercowego', 'PL')
insert into category(id, category, locale) values (24, 'Wybrane receptory układu autonomicznego', 'PL')

insert into flashcard(id, text, description, category_id) values (1, 'MAP', 'Mean Arterial Pressure', 1)

insert into flashcard(id, text, description, category_id) values (2, 'TPR', 'Total Peripheral Resistance', 1)
insert into flashcard(id, text, description, category_id) values (3, 'CO', 'Cardiac output', 1)
insert into flashcard(id, text, description, category_id) values (4, 'SV', 'Stroke volume', 1)
insert into flashcard(id, text, description, category_id) values (5, 'HR', 'Heart rate', 1)
insert into flashcard(id, text, description, category_id) values (6, 'EDV (1)', 'End-diastolic volume', 1)
insert into flashcard(id, text, description, category_id) values (7, 'EDV (2)', 'Objętość krwi znajdująca się w komorach serca tuż przed fazą ich skurczu.', 1)
insert into flashcard(id, text, description, category_id) values (8, 'ESV (1)', 'End-systolic volume', 1)
insert into flashcard(id, text, description, category_id) values (9, 'ESV (2)', 'Definition', 1)
insert into flashcard(id, text, description, category_id) values (10, 'CI', 'Cardiac index', 1)

insert into flashcard(id, text, description, category_id) values (11, 'MAP', 'Średnie ciśnienie tętnicze (Mean Arterial Pressure)', 13)
insert into flashcard(id, text, description, category_id) values (12, 'TPR', 'Całkowity opór obwodowy, całkowity obwodowy opór naczyniowy (Total Peripheral Resistance)', 13)
insert into flashcard(id, text, description, category_id) values (13, 'CO', 'pojemność minutowa serca (Cardiac output)', 13)
insert into flashcard(id, text, description, category_id) values (14, 'SV', 'objętość wyrzutowa serca (Stroke volume)', 13)
insert into flashcard(id, text, description, category_id) values (15, 'HR', 'częstość skurczów serca (Heart rate)', 13)
insert into flashcard(id, text, description, category_id) values (16, 'EDV (1)', 'Objętość końcoworozkurczowa,inaczej Objętość późnorozkurczowa (End-diastolic volume)', 13)
insert into flashcard(id, text, description, category_id) values (17, 'EDV (2)', 'Objętość krwi znajdująca się w komorach serca tuż przed fazą ich skurczu. Objętość ta ma wpływ na siłę skurczu komór. Zależność tę opisuje prawo Franka-Starlinga.', 13)
insert into flashcard(id, text, description, category_id) values (18, 'ESV (1)', 'objętość końcowoskurczowa (End-systolic volume)', 13)
insert into flashcard(id, text, description, category_id) values (19, 'ESV (2)', 'Definicja', 13)
insert into flashcard(id, text, description, category_id) values (20, 'CI', '"wskaźnik sercowy (Cardiac index)"', 13)