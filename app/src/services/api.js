import { backstage, classroom, locker, fitAxios } from '../configs/HTTP';

function buildQueryString(filters) {
  return Object.keys(filters).map((f, i) => i === 0 ? `?${f}=${filters[f]}` : `${f}=${filters[f]}`).join('&') || '';
}

const api = {
  gennera: {
    login: (username, password) => backstage.post('/auth/login', { username, password }),
    session: () => classroom.get('/auth/session', {}),
    customers: (idUser, userRole) => classroom.get(`/users/${idUser}/customers${buildQueryString({userRole})}`, {}),
    roles: (idUser) => classroom.get(`/users/${idUser}/roles`, {}),
    changeCustomer: (idCustomer) => classroom.post('/auth/changeCustomer', { idCustomer }),
    profileImage: (username) => backstage.get(`/public/users/photo?username=${username}`, {}),
  },
  classroom: {
    institutions: {
      list: () => classroom.get(`/institutions`, {}),
      diaries: {
        list: (idInstitution) => classroom.get(`/institutions/${idInstitution}/diaries`, {}),
      },
      periods: {
        list: (idInstitution, idAcademicCalendar) => classroom.get(`/institutions/${idInstitution}/periods?idAcademicCalendar=${idAcademicCalendar}`)
      }
    },
    users: {
      enrollments: {
        list: (idUser) => classroom.get(`/users/${idUser}/enrollments`, {})
      }
    }
  },
  fit: {
    timetables: {
      save: (timetable) => fitAxios.post(`/timetables`, timetable),
      list: () => fitAxios.get(`timetables`, {}),
      update: (idTimetable, timetable) => fitAxios.put(`/timetables/${idTimetable}`, timetable)
    },
    timetableSlot: {
        save: (idTimetable, timetableSlot) => fitAxios.post(`/timetables/${idTimetable}`, timetableSlot),
        delete: (idTimetable, idTimetableSlot) => fitAxios.delete(`/timetables/${idTimetable}/timetablesSlots/${idTimetableSlots}`)
    }
  },



  locker: {
    file: {
      save: (hash, file) => locker.post(`/locker/${hash}/file`, file, { bypassTokenInterceptor: true })
    }
  },
  // student: {
  //   classroom: {
  //     auth: {
  //       changeCustomer: (idCustomer) => classroom.post('/auth/changeCustomer', { idCustomer }),
  //       session: () => classroom.get('/auth/session', {})
  //     },
  //     users: {
  //       enrollments: {
  //         list: (idUser) => classroom.get(`/users/${idUser}/enrollments`, {})
  //       }
  //     },
  //     institutions: {
  //       list: () => classroom.get(`/institutions`, {}),
  //       diaries: {
  //         get: (idInstitution, idDiary) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}`, {}),
  //         list: (idInstitution) => classroom.get(`/institutions/${idInstitution}/diaries`, {}),
  //         periods: {
  //           list: (idInstitution, idDiary) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/periods`)
  //         },
  //         users: {
  //           attempts: {
  //             list: (idInstitution, idDiary, idUser, idQuiz) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/attempts?idQuiz=${idQuiz}`, {}),
  //             save: (idInstitution, idDiary, idUser, attempt) => classroom.post(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/attempts`, attempt),
  //             update: (idInstitution, idDiary, idUser, attempt) => classroom.put(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/attempts/${attempt.id}`, attempt)
  //           },
  //           attendances: {
  //             list: (idInstitution, idDiary, idUser) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/attendances`, {})
  //           },
  //           contents: {
  //             list: (idInstitution, idDiary, idUser) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/contents`, {})
  //           },
  //           grades: {
  //             list: (idInstitution, idDiary, idUser) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/grades`, {})
  //           },
  //           freeAssessments: {
  //             list: (idInstitution, idDiary, idUser) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/freeAssessments`, {})
  //           },
  //           periodAttendances: {
  //             list: (idInstitution, idDiary, idUser, idDiaryPeriod) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/periodAttendances`, {params: {idDiaryPeriod}})
  //           },
  //           periodAverages: {
  //             list: (idInstitution, idDiary, idUser) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/periodAverages`, {})
  //           },
  //           userActivities: {
  //             get: (idInstitution, idDiary, idUser, idActivity) => classroom.get(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/userActivities?idActivity=${idActivity}`, {}),
  //             save: (idInstitution, idDiary, idUser, file) => classroom.post(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/userActivities`, file)
  //           },
  //           tracking: {
  //             update: (idInstitution, idDiary, idUser, trackingEvent) => classroom.put(`/institutions/${idInstitution}/diaries/${idDiary}/users/${idUser}/tracking`, trackingEvent)
  //           }
  //         }
  //       },
  //       filters: {
  //         get: (idInstitution, filters) => classroom.get(`/institutions/${idInstitution}/filters${buildQueryString(filters)}`)
  //       },
  //       lessons: {
  //         list: (idInstitution, idAcademicCalendar, idCurriculumOffer, idModule) => classroom.get(`/institutions/${idInstitution}/lessons?idAcademicCalendar=${idAcademicCalendar}&idCurriculumOffer=${idCurriculumOffer}&idModule=${idModule}`)
  //       },
  //       messages: {
  //         list: (idInstitution, filters = {}) => classroom.get(`/institutions/${idInstitution}/messages${buildQueryString(filters)}`),
  //         save: (idInstitution, body) => classroom.post(`/institutions/${idInstitution}/messages`, body),
  //         delete: (idInstitution, idMessage) => classroom.delete(`/institutions/${idInstitution}/messages/${idMessage}`),
  //         likes: {
  //           list: (idInstitution, idMessage) => classroom.get(`/institutions/${idInstitution}/messages/${idMessage}/likes`),
  //           save: (idInstitution, idMessage) => classroom.post(`/institutions/${idInstitution}/messages/${idMessage}/likes`),
  //           delete: (idInstitution, idMessage, idLike) => classroom.delete(`/institutions/${idInstitution}/messages/${idMessage}/likes/${idLike}`)
  //         },
  //         comments : {
  //           list: (idInstitution, idMessage) => classroom.get(`/institutions/${idInstitution}/messages/${idMessage}/comments`),
  //           save: (idInstitution, idMessage, body) => classroom.post(`/institutions/${idInstitution}/messages/${idMessage}/comments`, body),
  //           delete: (idInstitution, idMessage, idComment) => classroom.delete(`/institutions/${idInstitution}/messages/${idMessage}/comments/${idComment}`),
  //           likes: {
  //             list: (idInstitution, idMessage, idComment) => classroom.get(`/institutions/${idInstitution}/messages/${idMessage}/comments/${idComment}/likes`),
  //             save: (idInstitution, idMessage, idComment) => classroom.post(`/institutions/${idInstitution}/messages/${idMessage}/comments/${idComment}/likes`),
  //             delete: (idInstitution, idMessage, idComment, idLike) => classroom.delete(`/institutions/${idInstitution}/messages/${idMessage}/comments/${idComment}/likes/${idLike}`)
  //           }
  //         }
  //       },
  //       periods: {
  //         list: (idInstitution, idAcademicCalendar) => classroom.get(`/institutions/${idInstitution}/periods?idAcademicCalendar=${idAcademicCalendar}`)
  //       },
  //       users: {
  //         groups: {
  //           list: (idInstitution, idUser) => classroom.get(`/institutions/${idInstitution}/users/${idUser}/groups`, {})
  //         },
  //         enrollments: {
  //           contracts: {
  //             list: (idInstitution, idUser, idEnrollment) => classroom.get(`/institutions/${idInstitution}/users/${idUser}/enrollments/${idEnrollment}/contracts`, {})
  //           }
  //         },
  //       }
  //     }
  //   }
  // }
};

export default api;
