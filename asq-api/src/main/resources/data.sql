insert into procedimento values(1234, 'Procedimento 1234');
insert into procedimento values(4567, 'Procedimento 4567');
insert into procedimento values(6789, 'Procedimento 6789');
insert into autorizacao(idade, permitido, sexo, procedimento_id) values(10, true, 'MASCULINO', 1234);
insert into autorizacao(idade, permitido, sexo, procedimento_id) values(20, true, 'MASCULINO', 1234);
insert into autorizacao(idade, permitido, sexo, procedimento_id) values(20, true, 'MASCULINO', 4567);
insert into autorizacao(idade, permitido, sexo, procedimento_id) values(30, true, 'FEMININO', 4567);
insert into autorizacao(idade, permitido, sexo, procedimento_id) values(10, true, 'FEMININO', 6789);
insert into autorizacao(idade, permitido, sexo, procedimento_id) values(10, true, 'MASCULINO', 6789);
