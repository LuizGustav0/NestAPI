import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  private audience = 'users';
  private issuer = 'login';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          audience: this.audience,
          issuer: this.issuer,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('E-mail não incorreto.');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        audience: 'forget',
        issuer: 'users',
      },
    );

    await this.mailer.sendMail({
      subject: 'Recuperação de Senha',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        token: token,
      },
    });

    return { success: true };
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        audience: 'forget',
        issuer: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token inválido');
      }

      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);

      await this.usersRepository.update(Number(data.id), {
        password,
      });

      const user = await this.userService.show(Number(data.id));

      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDTO) {
    delete data.role;

    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
