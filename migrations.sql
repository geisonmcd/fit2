drop table fit.user;
create table fit.user (
  id_user serial primary key not null,
  username text unique,
  password text,
  name text not null,
  role text not null
);

-- insert into fit.user (username, password, name, role) values ('a', '1', 'geison', 'manager');
-- INSERT INTO fit."user" (id_user, username, "password", "name", "role") VALUES(2, 'b', 'b', 'chali', 'client');

create table fit.timetable (
  id_timetable serial primary key not null,
  name text not null
);

create table fit.timetable_slot (
  id_timetable_slot serial primary key not null,
  id_timetable integer,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  foreign key (id_timetable) references fit.timetable (id_timetable)
);

drop table fit.class;
create table fit.class (
  id_class serial primary key not null,
  name text,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  vacancies integer not null,
  locked boolean default true
);

create table fit.user_class (
  id_user integer not null,
  id_class integer not null,
  primary key (id_class, id_user),
  foreign key (id_user) references fit.user (id_user),
  foreign key (id_class) references fit.class (id_class)
);