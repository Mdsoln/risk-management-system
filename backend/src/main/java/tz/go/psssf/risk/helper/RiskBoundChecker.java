package tz.go.psssf.risk.helper;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;
import tz.go.psssf.risk.dto.RiskIndicatorThresholdDTO;
import tz.go.psssf.risk.dto.ComparisonConditionDTO;
import tz.go.psssf.risk.dto.RiskIndicatorDTO;
import tz.go.psssf.risk.entity.ComparisonOperator;
import tz.go.psssf.risk.entity.Measurement;
import tz.go.psssf.risk.repository.ThresholdCategoryRepository;
import tz.go.psssf.risk.repository.ComparisonOperatorRepository;
import tz.go.psssf.risk.repository.MeasurementRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@ApplicationScoped
public class RiskBoundChecker {

    @Inject
    Logger log;

    @Inject
    ThresholdCategoryRepository thresholdCategoryRepository;

    @Inject
    ComparisonOperatorRepository comparisonOperatorRepository;

    @Inject
    MeasurementRepository measurementRepository;

    /**
     * Validates that the high and low threshold categories are valid and that their bounds make sense.
     *
     * @param thresholdDTOs The list of RiskIndicatorThresholdDTOs.
     * @param riskIndicatorDTO The RiskIndicatorDTO object to provide context in case of errors.
     * @throws IllegalArgumentException if the thresholds or bounds are invalid.
     */
    public void validateBounds(List<RiskIndicatorThresholdDTO> thresholdDTOs, RiskIndicatorDTO riskIndicatorDTO) {
        if (thresholdDTOs == null || thresholdDTOs.size() < 2) {
            throw new IllegalArgumentException("There must be at least two thresholds for validation. Found: " + (thresholdDTOs == null ? "null" : thresholdDTOs.size()));
        }

        // Fetch the measurementId from RiskIndicatorDTO
        String measurementId = riskIndicatorDTO.getMeasurementId();
        if (measurementId == null) {
            throw new IllegalArgumentException("Measurement ID is required for threshold validation in RiskIndicator: " + riskIndicatorDTO.getIndicator());
        }

        // Fetch the Measurement using the measurementId
        Measurement measurement = measurementRepository.findById(measurementId);
        if (measurement == null) {
            throw new IllegalArgumentException("Invalid Measurement ID: " + measurementId + " in RiskIndicator: " + riskIndicatorDTO.getIndicator());
        }

        log.info("Fetched Measurement: " + measurement.getName());

        // Perform bound validation based on the measurement fetched
        if (!isValidThreshold(thresholdDTOs, measurement)) {
            throw new IllegalArgumentException("Invalid threshold bounds for RiskIndicator: " + riskIndicatorDTO.getIndicator() + " with Measurement: " + measurement.getName() + ". The high bound must be greater than or equal to the low bound.");
        }

        log.info("Threshold bounds are valid for Measurement: " + measurement.getName());
    }

    /**
     * A helper method to validate thresholds within the provided list for a given Measurement.
     *
     * @param thresholdDTOs The list of RiskIndicatorThresholdDTOs.
     * @param measurement The Measurement object for context during validation.
     * @return true if all thresholds are valid, false otherwise.
     */
    private boolean isValidThreshold(List<RiskIndicatorThresholdDTO> thresholdDTOs, Measurement measurement) {
        try {
            if (thresholdDTOs == null || thresholdDTOs.isEmpty()) {
                throw new IllegalArgumentException("ThresholdDTOs list cannot be null or empty for Measurement: " + measurement.getName());
            }

            if (thresholdDTOs.size() < 2) {
                throw new IllegalArgumentException("At least two thresholds are required for validation. Found: " + thresholdDTOs.size() + " for Measurement: " + measurement.getName());
            }

            // Get the first threshold (high) and the second threshold (low)
            RiskIndicatorThresholdDTO highThresholdDTO = thresholdDTOs.get(0);
            RiskIndicatorThresholdDTO lowThresholdDTO = thresholdDTOs.get(1);

            // Ensure both thresholds have comparison conditions
            if (highThresholdDTO.getComparisonConditions().isEmpty() || lowThresholdDTO.getComparisonConditions().isEmpty()) {
                throw new IllegalArgumentException("Both high and low thresholds must have comparison conditions for Measurement: " + measurement.getName());
            }

            ComparisonConditionDTO highCondition = highThresholdDTO.getComparisonConditions().get(0);
            ComparisonConditionDTO lowCondition = lowThresholdDTO.getComparisonConditions().get(0);

            // Handle each measurement type
            switch (measurement.getCode()) {
                case "COUNT":
                case "MEMBERS":
                case "AGE":
                case "MONEY":
                case "YEARS":
                case "AMOUNT":
                case "DAYS":
                case "MONTHS":
                case "QUANTITY":
                    return compareNumericBounds(highCondition.getBound(), lowCondition.getBound(), measurement);

                case "RATIO":
                    return isValidRatio(highCondition.getBound(), lowCondition.getBound());

                case "PERCENTAGE":
                    return comparePercentageBounds(highCondition.getBound(), lowCondition.getBound());

                case "DATETIME":
                    return compareDateTimeBounds(highCondition.getBound(), lowCondition.getBound());

                case "DATE":
                    return compareDateBounds(highCondition.getBound(), lowCondition.getBound());

                default:
                    throw new IllegalArgumentException("Unsupported measurement type: " + measurement.getCode());
            }
        } catch (NumberFormatException e) {
            log.error("Failed to parse bounds for threshold validation for Measurement: " + measurement.getName(), e);
            return false;
        }
    }

    /**
     * Fetches the symbol for a given ComparisonOperator ID.
     *
     * @param comparisonOperatorId The ID of the comparison operator.
     * @return The symbol of the comparison operator.
     */
    private String getComparisonOperatorSymbol(String comparisonOperatorId) {
        ComparisonOperator operator = comparisonOperatorRepository.findById(comparisonOperatorId);
        if (operator == null) {
            throw new IllegalArgumentException("Comparison operator with ID " + comparisonOperatorId + " not found.");
        }
        return operator.getSymbol();
    }

    /**
     * Compare high and low bounds using their respective comparison operators.
     *
     * @param highOperator The comparison operator for the high threshold.
     * @param highBound    The bound value for the high threshold.
     * @param lowOperator  The comparison operator for the low threshold.
     * @param lowBound     The bound value for the low threshold.
     * @return true if the comparison is valid, false otherwise.
     */
    private boolean compareBounds(String highOperator, double highBound, String lowOperator, double lowBound) {
        switch (highOperator) {
            case ">":
            case ">=":
                return highBound >= lowBound;
            case "<":
            case "<=":
                return highBound <= lowBound;
            case "==":
                return highBound == lowBound;
            case "!=":
                return highBound != lowBound;
            default:
                log.error("Unsupported comparison operator: " + highOperator);
                return false;
        }
    }
    
    
    // 	1.	Numeric Measurements:
    private boolean compareNumericBounds(String highBound, String lowBound, Measurement measurement) {
        try {
            double highValue = Double.parseDouble(highBound);
            double lowValue = Double.parseDouble(lowBound);
            
            if (highValue < lowValue) {
                throw new IllegalArgumentException("High bound (" + highValue + ") must be greater than or equal to low bound (" + lowValue + ") for Measurement: " + measurement.getName());
            }
            
            return true;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid numeric value for bounds in Measurement: " + measurement.getName() + ". High bound: " + highBound + ", Low bound: " + lowBound);
        }
    }
    
    // 	2.	Ratio (Already handled in previous example):
    private boolean isValidRatio(String highBound, String lowBound) {
        try {
            String[] highParts = highBound.split(":");
            String[] lowParts = lowBound.split(":");

            if (highParts.length != 2 || lowParts.length != 2) {
                throw new IllegalArgumentException("Ratio bounds must be in the format x:y. Found: High = " + highBound + ", Low = " + lowBound);
            }

            int highNumerator = Integer.parseInt(highParts[0]);
            int highDenominator = Integer.parseInt(highParts[1]);

            int lowNumerator = Integer.parseInt(lowParts[0]);
            int lowDenominator = Integer.parseInt(lowParts[1]);

            // Check if the ratio is valid (highRatio >= lowRatio)
            return (highNumerator * lowDenominator) >= (lowNumerator * highDenominator);
        } catch (NumberFormatException e) {
            log.error("Invalid ratio format for bounds: High = " + highBound + ", Low = " + lowBound, e);
            return false;
        }
    }
    
    // 	3.	Percentage:
    private boolean comparePercentageBounds(String highBound, String lowBound) {
        try {
            double highValue = Double.parseDouble(highBound);
            double lowValue = Double.parseDouble(lowBound);

            if (highValue > 100 || lowValue < 0) {
                throw new IllegalArgumentException("Percentage bounds must be between 0 and 100. Found: High = " + highValue + ", Low = " + lowValue);
            }

            if (highValue < lowValue) {
                throw new IllegalArgumentException("High percentage (" + highValue + ") must be greater than or equal to low percentage (" + lowValue + ").");
            }

            return true;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid percentage value. High: " + highBound + ", Low: " + lowBound);
        }
    }
    
    // 	4.	Datetime:
    private boolean compareDateTimeBounds(String highBound, String lowBound) {
        try {
            LocalDateTime highDateTime = LocalDateTime.parse(highBound);
            LocalDateTime lowDateTime = LocalDateTime.parse(lowBound);

            if (highDateTime.isBefore(lowDateTime)) {
                throw new IllegalArgumentException("High datetime (" + highDateTime + ") must be after or equal to low datetime (" + lowDateTime + ").");
            }

            return true;
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid datetime format. High: " + highBound + ", Low: " + lowBound);
        }
    }
    
    // 	5.	Date:

    private boolean compareDateBounds(String highBound, String lowBound) {
        try {
            LocalDate highDate = LocalDate.parse(highBound);
            LocalDate lowDate = LocalDate.parse(lowBound);

            if (highDate.isBefore(lowDate)) {
                throw new IllegalArgumentException("High date (" + highDate + ") must be after or equal to low date (" + lowDate + ").");
            }

            return true;
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format. High: " + highBound + ", Low: " + lowBound);
        }
    }
}