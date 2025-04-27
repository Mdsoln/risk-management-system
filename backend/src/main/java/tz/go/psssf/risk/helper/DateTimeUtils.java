package tz.go.psssf.risk.helper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

public class DateTimeUtils {
    private static final List<DateTimeFormatter> DATE_FORMATTERS = new ArrayList<>();

    static {
//        DATE_FORMATTERS.add(DateTimeFormatter.ofPattern("yyyy-MM-dd[ HH:mm[:ss]]"));
        DATE_FORMATTERS.add(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
//        DATE_FORMATTERS.add(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
//        DATE_FORMATTERS.add(DateTimeFormatter.ofPattern("yyyy-MM-dd HH"));
//        DATE_FORMATTERS.add(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public static LocalDateTime parseDateTime(String dateStr) {
        for (DateTimeFormatter formatter : DATE_FORMATTERS) {
            try {
                return LocalDateTime.parse(dateStr, formatter);
            } catch (DateTimeParseException e) {
                // Try the next format
            }
        }
        throw new IllegalArgumentException("Invalid date format: " + dateStr);
    }
}
