const database = require('infra/database');

const getReviewByIdInstitutionAndIdUser = function (idInstitution, idUser) {
    return database.oneOrNone(`
        select 
            r.*,
            row_to_json(i.*) as institution
        from 
            review r
        join
            institution i on (r.id_institution = i.id_institution and r.id_app_user = $2)
        where
            i.id_institution = $1`,
        [idInstitution, idUser]);
};

const saveReview = function (idInstitution, idUser, review) {
    database.none("insert into review (id_app_user, id_institution, grade, opinion) values ($1, $2, $3, $4)", [idUser, idInstitution,  review.grade, review.opinion]);
};

const updateReview = function (idReview, review) {
    database.none("update review set grade = $2, opinion = $3 where id_review = $1", [idReview, review.grade, review.opinion]);
};

module.exports = {
    getReviewByIdInstitutionAndIdUser,
    saveReview,
    updateReview
};