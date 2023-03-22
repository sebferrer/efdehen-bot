import { Express } from 'express';
import { HealthCheckController } from '../controllers';

export function healthCheckRoute(app: Express): void {
    const controller = new HealthCheckController();

    app.route('/api/health')
        .get((request, result) => {
            controller.get(request, result);
        })
}
