import Stripe from 'stripe';
import { environment } from './environment';

export const stripe = new Stripe(environment.stripe_key, {
  typescript: true,
  apiVersion: '2020-08-27',
});