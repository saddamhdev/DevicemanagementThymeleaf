# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:21-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/DeviceManagement-1.0.jar app.jar

# Expose the port your application runs on
EXPOSE 3079

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]