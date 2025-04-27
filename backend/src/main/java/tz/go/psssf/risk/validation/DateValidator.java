package tz.go.psssf.risk.validation;

import java.time.LocalDateTime;

public class DateValidator {

    public static boolean isStartDateBeforeEndDate(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        if (startDateTime == null || endDateTime == null) {
            return true;
        }
        return startDateTime.isBefore(endDateTime);
    }
}
