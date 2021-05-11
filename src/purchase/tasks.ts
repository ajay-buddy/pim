import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';

// @Processor('test-producer')
// export class TestConsumer {
//   private readonly logger = new Logger(TestConsumer.name);
//   @Process('test')
//   async transcode(job: Job, cb: DoneCallback) {
//     let progress = 0;
//     for (let i = 0; i < 100000000; i++) {
//       console.log('-----> Hello');
//       this.logger.log('---->');
//       this.logger.debug('---->Start transcoding...');
//       progress += 10;
//       job.progress(progress);
//     }
//     cb(null, 'It works');
//   }
// }

export default function (job: Job, cb: DoneCallback) {
  const logger = new Logger('TestConsumer');
  for (let i = 0; i < 100000000; i++) {
    console.log('-----> Hello');
    logger.log('---->');
  }
  console.log(`[${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, 'It works');
}
