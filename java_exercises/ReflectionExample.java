package java_exercises;
import java.lang.reflect.Method;

class Sample {
    public void sayHello() {
        System.out.println("Hello via Reflection!");
    }
}

public class ReflectionExample {
    public static void main(String[] args) {
        try {
            Class<?> clazz = Class.forName("Sample");
            Object instance = clazz.getDeclaredConstructor().newInstance();
            Method method = clazz.getDeclaredMethod("sayHello");
            method.invoke(instance);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}