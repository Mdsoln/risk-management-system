package tz.go.psssf.risk.helper;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;

import tz.go.psssf.risk.config.LocalDateTimeAdapter;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class JsonConverter {

    private static final Gson gson;

    static {
        gson = new GsonBuilder()
//                .setPrettyPrinting()
                .serializeNulls()
                // Register the LocalDateTime adapter to handle serialization and deserialization
                .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
                .registerTypeAdapterFactory(new CircularReferenceTypeAdapter.Factory())  // Register custom TypeAdapterFactory
                .create();
    }

    // Convert Object to JSON String
    public static String toJson(Object obj) {
        try {
            return gson.toJson(obj);  // Convert object to JSON string
        } catch (Exception e) {
            throw new RuntimeException("Error converting object to JSON", e);
        }
    }

    // Convert JSON String to Object of given Class type
    public static <T> T fromJson(String json, Class<T> clazz) {
        try {
            return gson.fromJson(json, clazz);  // Convert JSON string back to object
        } catch (JsonParseException e) {
            throw new RuntimeException("Error converting JSON to object", e);
        }
    }

    // Convert JSON String to Object of a specific type (for generic types like List or Map)
    public static <T> T fromJson(String json, Type typeOfT) {
        try {
            return gson.fromJson(json, typeOfT);  // Convert JSON string back to a generic object
        } catch (JsonParseException e) {
            throw new RuntimeException("Error converting JSON to object", e);
        }
    }
}