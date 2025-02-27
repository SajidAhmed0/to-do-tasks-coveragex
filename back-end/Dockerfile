# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies (to leverage Docker caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the actual source code
COPY src/ src/

# Build the project
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17

WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/to-do-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

