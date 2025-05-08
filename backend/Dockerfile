# File: backend/Dockerfile

# Stage 1: Build the WAR
FROM maven:3.8.4-openjdk-11 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run on WildFly at ROOT context
FROM quay.io/wildfly/wildfly:latest-jdk17

# Add PostgreSQL driver
USER root
RUN mkdir -p /opt/jboss/wildfly/modules/org/postgresql/main
COPY --from=build /app/target/dependencies/postgresql-*.jar /opt/jboss/wildfly/modules/org/postgresql/main/postgresql.jar

# Add PostgreSQL module definition
COPY module.xml /opt/jboss/wildfly/modules/org/postgresql/main/

# Copy the WAR file
COPY --from=build /app/target/*.war /opt/jboss/wildfly/standalone/deployments/ROOT.war

USER jboss
EXPOSE 8080
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]