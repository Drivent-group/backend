import { getActivitiesController, postSubscriptionController } from '@/controllers/activities.controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', postSubscriptionController)
  .get('/day/:dayId', getActivitiesController)
  .post('/subscription');

export { activitiesRouter };
