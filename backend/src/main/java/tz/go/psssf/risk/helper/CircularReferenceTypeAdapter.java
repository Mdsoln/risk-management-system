package tz.go.psssf.risk.helper;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.TypeAdapter;
import com.google.gson.TypeAdapterFactory;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;

public class CircularReferenceTypeAdapter<T> extends TypeAdapter<T> {

    private final TypeAdapter<T> delegate;
    private final CircularReferenceExclusionStrategy exclusionStrategy;

    public CircularReferenceTypeAdapter(TypeAdapter<T> delegate, CircularReferenceExclusionStrategy exclusionStrategy) {
        this.delegate = delegate;
        this.exclusionStrategy = exclusionStrategy;
    }

    @Override
    public void write(com.google.gson.stream.JsonWriter out, T value) throws java.io.IOException {
        // Check for circular references
        if (exclusionStrategy.shouldSkipObject(value)) {
            out.nullValue();  // Write null to indicate a circular reference
        } else {
            try {
                delegate.write(out, value);  // Delegate the actual serialization to the default adapter
            } finally {
                exclusionStrategy.afterSerialization(value);  // Mark the object as fully serialized
            }
        }
    }

    @Override
    public T read(com.google.gson.stream.JsonReader in) throws java.io.IOException {
        return delegate.read(in);  // Use the default deserialization logic
    }

    public static class Factory implements TypeAdapterFactory {
        private final CircularReferenceExclusionStrategy exclusionStrategy = new CircularReferenceExclusionStrategy();

        @Override
        public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
            TypeAdapter<T> delegate = gson.getDelegateAdapter(this, type);
            return new CircularReferenceTypeAdapter<>(delegate, exclusionStrategy);
        }
    }
}