import { Test, TestingModule } from '@nestjs/testing';
import { CredentialOtpService } from './credential-otp.service';

describe('CredentialOtpService', () => {
  let service: CredentialOtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialOtpService],
    }).compile();

    service = module.get<CredentialOtpService>(CredentialOtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
