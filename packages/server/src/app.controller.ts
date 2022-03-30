import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { nanoid } from 'nanoid';
import { sign } from 'tweetnacl';
import { decodeBase64 } from 'tweetnacl-util';
import { PublicKey } from '@solana/web3.js';

const encodeMessage = (nonce: string) =>
  new TextEncoder().encode(`This signature proves ownership of
your public key. 

Clicking "Approve" or "Sign" does not
submit a blockchain transaction, and
does not incur any gas fee.
\n \n nonce: ${nonce}`);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  nonceMap = {};

  @UseGuards(AuthGuard('local'))
  @Post('auth/local')
  async login(@Request() req) {
    return req.user;
  }

  @Post('auth/solana')
  async authSolana(@Body() body) {
    const nonce = this.nonceMap[body.publicKey];
    const publicKey = new PublicKey(body.publicKey);
    const encodedMessage = encodeMessage(nonce);

    const signature = decodeBase64(body.signature);

    const verified = sign.detached.verify(
      encodedMessage,
      signature,
      publicKey.toBytes(),
    );

    return { verified };
  }

  @Get('auth/get-nonce')
  async getNonce(@Query('publicKey') publicKey: string) {
    // store the nonce + publicKey pair
    const nonce = nanoid(10);
    this.nonceMap[publicKey] = nonce;

    return { nonce };
  }
}
