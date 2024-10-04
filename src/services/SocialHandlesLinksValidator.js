function validateFacebookUrl(url) {
    const regex = /^(https?:\/\/)?((\w{2,3}\.)?facebook.com\/[A-Za-z0-9_.-]+)$/;
    return regex.test(url);
}

function validateInstagramUrl(url) {
    const regex = /^(https?:\/\/)?((\w{2,3}\.)?instagram.com\/[A-Za-z0-9_.-]+)$/;
    return regex.test(url);
}

function validateXUrl(url) {
    const regex = /^(https?:\/\/)?((\w{2,3}\.)?x.com\/[A-Za-z0-9_]+)$/; // Assuming X's URL structure is similar to Twitter
    return regex.test(url);
}

function validateLinkedInUrl(url) {
    const regex = /^(https?:\/\/)?((\w{2,3}\.)?linkedin.com\/in\/[A-Za-z0-9_-]+)$/;
    return regex.test(url);
}

function validateWebsiteUrl(url) {
    const regex = /^(https?:\/\/)?((\w{2,3}\.)?([A-Za-z0-9_-]+\.)+[A-Za-z]{2,})(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url);
}

function validateWhatsAppUrl(url) {
    const regex = /^(https?:\/\/)?((\w{2,3}\.)?wa.me\/\+?[0-9]+)$/;
    return regex.test(url);
}

function validateYouTubeUrl(url) {
    const regex = /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|c\/|user\/|@)[A-Za-z0-9_-]{1,30}$/;
    return regex.test(url);
}


export function validateSocialHandle(social){
    switch (social.platform){
        case "facebook":
            return validateFacebookUrl(social.link);

        case "instagram":
            return validateInstagramUrl(social.link);

        case "x":
            return validateXUrl(social.link);

        case "linkedin":
            return validateLinkedInUrl(social.link);

        case "whatsapp":
            return validateWhatsAppUrl(social.link);

        case "website":
            return validateWebsiteUrl(social.link);

        case "youtube":
            return validateYouTubeUrl(social.link);

        default:
            return false;
    }
}