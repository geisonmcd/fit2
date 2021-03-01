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