import { MailerService } from "@nestjs-modules/mailer";

export const mailerServiceMock = {
    provide: MailerService,
    useValue: {
       sendEmail: jest.fn()
    }
}