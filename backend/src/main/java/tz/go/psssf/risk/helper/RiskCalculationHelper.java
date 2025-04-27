package tz.go.psssf.risk.helper;

import tz.go.psssf.risk.entity.Impact;
import tz.go.psssf.risk.entity.Likelihood;
import tz.go.psssf.risk.entity.Risk;

public class RiskCalculationHelper {

//	private static final String[][] RISK_MATRIX = {
//	        {"Negligible (Very Low)", "Minor (Low)", "Minor (Low)", "Moderate", "Moderate"},
//	        {"Minor (Low)", "Minor (Low)", "Moderate", "Moderate", "Major (High)"},
//	        {"Minor (Low)", "Moderate", "Moderate", "Major (High)", "Major (High)"},
//	        {"Moderate", "Moderate", "Major (High)", "Major (High)", "Extreme (Very High)"},
//	        {"Moderate", "Major (High)", "Major (High)", "Extreme (Very High)", "Extreme (Very High)"}
//	    };
//
//	    private static final String[][] COLOR_MATRIX = {
//	        {"Green", "LightGreen", "LightGreen", "Yellow", "Yellow"},
//	        {"LightGreen", "LightGreen", "Yellow", "Yellow", "Orange"},
//	        {"LightGreen", "Yellow", "Yellow", "Orange", "Orange"},
//	        {"Yellow", "Yellow", "Orange", "Orange", "Red"},
//	        {"Yellow", "Orange", "Orange", "Red", "Red"}
//	    };
//
//	    private static final String[][] DESCRIPTION_MATRIX = {
//	        {"Negligible", "Acceptable", "Acceptable", "Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate"},
//	        {"Acceptable", "Acceptable", "Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate", "Cautious/High"},
//	        {"Acceptable", "Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate", "Cautious/High", "Cautious/High"},
//	        {"Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate", "Cautious/High", "Cautious/High", "No Tolerance/Extreme"},
//	        {"Tolerable/Conservative/Moderate", "Cautious/High", "Cautious/High", "No Tolerance/Extreme", "No Tolerance/Extreme"}
//	    };
	
	private static final String[][] RISK_MATRIX = {
		    {"Moderate", "Major (High)", "Major (High)", "Extreme (Very High)", "Extreme (Very High)"},
		    {"Moderate", "Moderate", "Major (High)", "Major (High)", "Extreme (Very High)"},
		    {"Minor (Low)", "Moderate", "Moderate", "Major (High)", "Major (High)"},
		    {"Minor (Low)", "Minor (Low)", "Moderate", "Moderate", "Major (High)"},
		    {"Negligible (Very Low)", "Minor (Low)", "Minor (Low)", "Moderate", "Moderate"}
		};

		private static final String[][] COLOR_MATRIX = {
		    {"Yellow", "Orange", "Orange", "Red", "Red"},
		    {"Yellow", "Yellow", "Orange", "Orange", "Red"},
		    {"LightGreen", "Yellow", "Yellow", "Orange", "Orange"},
		    {"LightGreen", "LightGreen", "Yellow", "Yellow", "Orange"},
		    {"Green", "LightGreen", "LightGreen", "Yellow", "Yellow"}
		};

		private static final String[][] DESCRIPTION_MATRIX = {
		    {"Tolerable/Conservative/Moderate", "Cautious/High", "Cautious/High", "No Tolerance/Extreme", "No Tolerance/Extreme"},
		    {"Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate", "Cautious/High", "Cautious/High", "No Tolerance/Extreme"},
		    {"Acceptable", "Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate", "Cautious/High", "Cautious/High"},
		    {"Acceptable", "Acceptable", "Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate", "Cautious/High"},
		    {"Negligible", "Acceptable", "Acceptable", "Tolerable/Conservative/Moderate", "Tolerable/Conservative/Moderate"}
		};




    public static RiskLevelAndColor calculateRiskLevelAndColor(Likelihood likelihood, Impact impact) {
        if (likelihood == null || impact == null) {
            return new RiskLevelAndColor("UNKNOWN", "Grey", "Unknown");
        }

        int likelihoodScore = likelihood.getScore();
        int impactScore = impact.getScore();

        if (likelihoodScore < 1 || likelihoodScore > 5 || impactScore < 1 || impactScore > 5) {
            return new RiskLevelAndColor("UNKNOWN", "Grey", "Unknown");
        }

        String riskLevel = RISK_MATRIX[5 - likelihoodScore][impactScore - 1];
        String riskColor = COLOR_MATRIX[5 - likelihoodScore][impactScore - 1];
        String riskDescription = DESCRIPTION_MATRIX[5 - likelihoodScore][impactScore - 1];
        



        return new RiskLevelAndColor(riskLevel, riskColor, riskDescription);
    }

    public static RiskMatrixResult calculateInherentRiskMatrix(Risk risk) {
        return calculateRiskMatrix(risk.getInherentRisk().getLikelihood(), risk.getInherentRisk().getImpact());
    }

    public static RiskMatrixResult calculateResidualRiskMatrix(Risk risk) {
        return calculateRiskMatrix(risk.getResidualRisk().getLikelihood(), risk.getResidualRisk().getImpact());
    }

    private static RiskMatrixResult calculateRiskMatrix(Likelihood likelihood, Impact impact) {
        int likelihoodScore = likelihood.getScore();
        int impactScore = impact.getScore();

        RiskMatrixCell[][] matrix = new RiskMatrixCell[5][5];
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                boolean highlighted = (5 - likelihoodScore == i) && (impactScore - 1 == j);

                matrix[i][j] = new RiskMatrixCell(RISK_MATRIX[i][j], COLOR_MATRIX[i][j], highlighted);
            }
        }

        int[] impactScores = {1, 2, 3, 4, 5};
        int[] likelihoodScores = {1, 2, 3, 4, 5};

        // Debugging output to verify calculations
//        System.out.println("Likelihood Score: " + likelihoodScore);
//        System.out.println("Impact Score: " + impactScore);
//        System.out.println("Highlighted Cell: " + (5 - likelihoodScore) + "," + (impactScore - 1));
//        for (int i = 0; i < 5; i++) {
//            for (int j = 0; j < 5; j++) {
//                System.out.print(matrix[i][j].level + " ");
//            }
//            System.out.println();
//        }

        return new RiskMatrixResult(matrix, likelihoodScore, impactScore, impactScores, likelihoodScores);
    }

    public static class RiskMatrixResult {
        private final RiskMatrixCell[][] matrix;
        private final int likelihoodScore;
        private final int impactScore;
        private final int[] impactScores;
        private final int[] likelihoodScores;

        public RiskMatrixResult(RiskMatrixCell[][] matrix, int likelihoodScore, int impactScore, int[] impactScores, int[] likelihoodScores) {
            this.matrix = matrix;
            this.likelihoodScore = likelihoodScore;
            this.impactScore = impactScore;
            this.impactScores = impactScores;
            this.likelihoodScores = likelihoodScores;
        }

        public RiskMatrixCell[][] getMatrix() {
            return matrix;
        }

        public int getLikelihoodScore() {
            return likelihoodScore;
        }

        public int getImpactScore() {
            return impactScore;
        }

        public int[] getImpactScores() {
            return impactScores;
        }

        public int[] getLikelihoodScores() {
            return likelihoodScores;
        }
    }

    public static class RiskMatrixCell {
        private final String level;
        private final String color;
        private final boolean highlighted;

        public RiskMatrixCell(String level, String color, boolean highlighted) {
            this.level = level;
            this.color = color;
            this.highlighted = highlighted;
        }

        public String getLevel() {
            return level;
        }

        public String getColor() {
            return color;
        }

        public boolean isHighlighted() {
            return highlighted;
        }
    }

    public static class RiskLevelAndColor {
        private final String riskLevel;
        private final String riskColor;
        private final String riskDescription;

        public RiskLevelAndColor(String riskLevel, String riskColor, String riskDescription) {
            this.riskLevel = riskLevel;
            this.riskColor = riskColor;
            this.riskDescription = riskDescription;
        }

        public String getRiskLevel() {
            return riskLevel;
        }

        public String getRiskColor() {
            return riskColor;
        }

        public String getRiskDescription() {
            return riskDescription;
        }
    }
}
