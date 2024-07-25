const parseIamGroups = (iamGroups) =>
  iamGroups?.split(';').filter(Boolean) ?? []

const checkAdmin = (iamGroups) => iamGroups.includes('grp-toska')

const mockHeaders = {
    uid: 'testUser',
    mail: 'address@helsinki.fi',
    preferredlanguage: 'fi',
    hypersonsisuid: 'hy-hlo-123456789',
    hygroupcn: 'grp-toska;hy-employees',
}

const userMiddleware = async (req, _res, next) => {
    const headers = process.env.NODE_ENV === 'production' ? req.headers : mockHeaders

    if (headers.uid == null) {
        req.kirjauduttu = false;

        return next()
    }
    const validateHelsinkiEmail = (email) => {
        // Define the regular expression pattern to match emails ending with @helsinki.fi
        const helsinkiEmailPattern = /^[a-zA-Z0-9._%+-]+@helsinki\.fi$/;
      
        return helsinkiEmailPattern.test(email);
    };
    if (!validateHelsinkiEmail(headers.mail)) {
        req.kirjauduttu = false;

        return next()
    }
    req.kirjauduttu = true;

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
};

module.exports = {
    userMiddleware,
    parseIamGroups,
    checkAdmin,
    mockHeaders,
  };