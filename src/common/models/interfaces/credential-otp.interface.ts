export interface ICredentialOtp {
    _id: string;
    dateCreated: string;
    email?: string;
    phoneNumber?: string;
    otp: string;
}
