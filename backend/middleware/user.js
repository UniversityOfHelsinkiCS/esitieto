

const mockHeaders = {
    uid: 'testUser',
    mail: 'address@helsinki.fi',
    preferredlanguage: 'fi',
    hypersonsisuid: 'hy-hlo-123456789',
    hygroupcn: 'grp-toska;hy-employees',
}

const userMiddleware = async (req, _res, next) => {
    console.log("userMiddleware");
    console.log("req.kirjauduttu: ", req.kirjauduttu);
    const headers = req.headers

    if (headers.uid == null) {
        headers.kirjauduttu = false;
        headers.kirjauduttu = false;

        return next()
    }
    headers.kirjauduttu = true;
    headers.kirjauduttu = true;


    const {
        uid: username,
        mail: email,
        preferredlanguage: language,
        hypersonsisuid: id,
        hygroupcn,
    } = headers

    const iamGroups = parseIamGroups(hygroupcn)

    const user = {
        id,
        username,
        email,
        language,
        iamGroups,
        isAdmin: checkAdmin(iamGroups),
    }

    req.user = user

    return next()
}

module.exports = userMiddleware;