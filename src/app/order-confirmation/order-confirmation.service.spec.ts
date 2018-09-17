import { TestBed, inject } from '@angular/core/testing';

import { OrderConfirmationService } from './order-confirmation.service';

describe('OrderConfirmationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderConfirmationService]
    });
  });

  it('should be created', inject([OrderConfirmationService], (service: OrderConfirmationService) => {
    expect(service).toBeTruthy();
  }));
});
