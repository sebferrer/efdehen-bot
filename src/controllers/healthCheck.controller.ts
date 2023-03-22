import { Request, Response } from 'express';
import { exec } from 'child_process';

export class HealthCheckController {

    public get(_: Request, response: Response): void {

        exec("pm2 list", (error: any, stdout: any, stderr: any) => {
            if (error) {
                response.send(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                response.send(`stderr: ${stderr}`);
                return;
            }
            response.send('<pre>' + stdout.replace(/\n/g, '<br/>') + '</pre>');
        });
    }

}
