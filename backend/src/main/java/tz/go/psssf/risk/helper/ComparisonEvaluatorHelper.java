package tz.go.psssf.risk.helper;

public class ComparisonEvaluatorHelper {
	
	public static boolean evaluate(double value, String comparisonOperator, double threshold) {
        switch (comparisonOperator) {
            case ">":
                return value > threshold;
            case ">=":
                return value >= threshold;
            case "<":
                return value < threshold;
            case "<=":
                return value <= threshold;
            case "==":
                return value == threshold;
            default:
                throw new IllegalArgumentException("Invalid comparison operator: " + comparisonOperator);
        }
    }

    public static boolean evaluate(double value, String lowerOperator, double lowerThreshold, String upperOperator, double upperThreshold) {
        boolean lowerCheck = evaluate(value, lowerOperator, lowerThreshold);
        boolean upperCheck = evaluate(value, upperOperator, upperThreshold);
        return lowerCheck && upperCheck;
    }

}


//
//package tz.go.psssf.risk;
//
//import tz.go.psssf.risk.util.ComparisonEvaluator;
//
//public class Main {
//    public static void main(String[] args) {
//        double value = 3.0;
//
//        // Evaluate "> 5"
//        boolean result1 = ComparisonEvaluator.evaluate(value, ">", 5);
//        System.out.println("> 5: " + result1);
//
//        // Evaluate "≥ 2 and ≤ 5"
//        boolean result2 = ComparisonEvaluator.evaluate(value, ">=", 2, "<=", 5);
//        System.out.println("≥ 2 and ≤ 5: " + result2);
//
//        // Evaluate "< 2"
//        boolean result3 = ComparisonEvaluator.evaluate(value, "<", 2);
//        System.out.println("< 2: " + result3);
//    }
//}
