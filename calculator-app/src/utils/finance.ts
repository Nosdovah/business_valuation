/**
 * Calculates PMT (Payment) based on Future Value (FV)
 */
export const calculatePMTfromFV = (fv: number, i: number, n: number): number => {
  if (i === 0) return fv / n;
  return fv / (((Math.pow(1 + i, n) - 1) / i));
};

/**
 * Calculates Present Value (PV) based on Future Value (FV)
 */
export const calculatePVfromFV = (fv: number, i: number, n: number): number => {
  return fv / Math.pow(1 + i, n);
};

/**
 * Calculates PMT for an Ordinary Annuity (based on PV)
 * Payments at the END of the period
 */
export const calculatePMTOrdinary = (pv: number, i: number, n: number): number => {
  if (i === 0) return pv / n;
  return pv / ((1 - Math.pow(1 + i, -n)) / i);
};

/**
 * Calculates PMT for an Annuity Due
 * Payments at the BEGINNING of the period
 */
export const calculatePMTDue = (pmtOrdinary: number, i: number): number => {
  return pmtOrdinary / (1 + i);
};

export const calculatePMTDueFromPV = (pv: number, i: number, n: number): number => {
    const ordinary = calculatePMTOrdinary(pv, i, n);
    return calculatePMTDue(ordinary, i);
}

/**
 * Calculates the number of periods (n)
 */
export const calculatePeriod = (pv: number, pmt: number, i: number): number => {
  if (pmt <= pv * i) {
     return Infinity; // The payment doesn't even cover the interest
  }
  return -(Math.log(1 - (pv * i) / pmt)) / Math.log(1 + i);
};

/**
 * Calculates the interest rate (i) iteratively
 * Since there's no algebraic solution, we use Newton-Raphson or simple Bisection.
 * Using Bisection method for stability.
 */
export const calculateInterestRate = (pv: number, pmt: number, n: number, tolerance = 0.00001, maxIter = 100): number => {
    let low = 0.00001; 
    let high = 1.0; // 100%
    let guess = 0;
    
    for (let iter = 0; iter < maxIter; iter++) {
        guess = (low + high) / 2;
        let pmtGuess = calculatePMTOrdinary(pv, guess, n);
        
        if (Math.abs(pmtGuess - pmt) < tolerance) {
            return guess;
        }
        
        if (pmtGuess > pmt) {
            // Interest rate is too high, PMT needs to be lower
            high = guess;
        } else {
            low = guess;
        }
    }
    
    return guess;
};
