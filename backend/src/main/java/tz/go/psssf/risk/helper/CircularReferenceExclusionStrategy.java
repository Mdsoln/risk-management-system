package tz.go.psssf.risk.helper;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

import java.util.IdentityHashMap;
import java.util.Map;

public class CircularReferenceExclusionStrategy implements ExclusionStrategy {

    // This map keeps track of the objects we are currently serializing
    private final Map<Object, Boolean> visitedObjects = new IdentityHashMap<>();

    @Override
    public boolean shouldSkipField(FieldAttributes f) {
        // Always include fields for now, we'll skip fields based on circular reference detection in the shouldSkipClass method
        return false;
    }

    @Override
    public boolean shouldSkipClass(Class<?> clazz) {
        return false;
    }

    public boolean shouldSkipObject(Object object) {
        if (object == null) {
            return false;
        }
        // If the object is already in the map, it means we've encountered it before, and it's a circular reference
        if (visitedObjects.containsKey(object)) {
            return true;  // Skip the object to prevent circular reference
        }
        // Mark the object as visited
        visitedObjects.put(object, true);
        return false;
    }

    public void afterSerialization(Object object) {
        // Once serialization of the object is done, remove it from the visited map
        if (object != null) {
            visitedObjects.remove(object);
        }
    }
}
