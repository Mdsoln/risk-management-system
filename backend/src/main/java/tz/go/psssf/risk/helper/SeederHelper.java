package tz.go.psssf.risk.helper;

import java.util.Random;

public class SeederHelper {
	
	private static final String[] RISK_WORD_POOL = {
	        "Risk", "Mitigation", "Impact", "Likelihood", "Probability", "Severity", "Assessment", 
	        "Management", "Control", "Incident", "Exposure", "Hazard", "Threat", "Vulnerability", 
	        "Compliance", "Audit", "Contingency", "Crisis", "Disaster", "Strategy", "Plan", "Recovery", 
	        "Response", "Prevention", "Safety", "Security", "Evaluation", "Analysis", "Report", "Tracking",
	        "Objective", "Tolerance", "Matrix", "Monitoring", "Review", "Policy", "Procedure", "Standard",
	        "Regulation", "Framework", "Governance", "Stakeholder", "Accountability", "Transparency", 
	        "Integrity", "Resilience", "Scenario", "Breach", "Control", "Protocol", "Incident", "Management",
	        "Cybersecurity", "Data", "Backup", "Encryption", "Access", "Threat", "Intelligence", "Awareness",
	        "Training", "Incident", "Response", "Plan", "Business", "Continuity", "Crisis", "Communication",
	        "Insurance", "Compliance", "Legal", "Risk", "Assessment", "Safety", "Health", "Environment",
	        "Operational", "Financial", "Market", "Credit", "Reputation", "Regulatory", "Strategic", "Project",
	        "Technical", "IT", "System", "Infrastructure", "Supply", "Chain", "Vendor", "Management", "Audit",
	        "Review", "Testing", "Scenario", "Planning", "Simulation", "Workshop", "Discussion", "Board",
	        "Committee", "Review", "Risk", "Appetite", "Tolerance", "Matrix", "Dashboard", "Reporting", 
	        "Metrics", "Key", "Performance", "Indicator", "Assessment", "Checklist", "Register", "Log", "Issue",
	        "Risk", "Management", "Framework", "Policy", "Procedure", "Standard", "Regulation", "Compliance", 
	        "Audit", "Governance", "Stakeholder", "Communication", "Plan", "Crisis", "Communication", "Strategy",
	        "Risk", "Mitigation", "Plan", "Contingency", "Business", "Continuity", "Plan", "Incident", 
	        "Response", "Plan", "Emergency", "Response", "Plan", "Recovery", "Plan", "Evaluation", "Review", 
	        "Monitoring", "Reporting", "Key", "Risk", "Indicator", "Key", "Performance", "Indicator", "Audit", 
	        "Review", "Testing", "Assessment", "Risk", "Appetite", "Tolerance", "Matrix", "Dashboard"
	    };
	
	
	

 
    private static final Random RANDOM = new Random();

    public static String generateDescription(int charCount) {
        StringBuilder description = new StringBuilder();
        while (description.length() < charCount) {
            String word = RISK_WORD_POOL[RANDOM.nextInt(RISK_WORD_POOL.length)];
            if (description.length() + word.length() + 1 > charCount) {
                break;
            }
            description.append(word).append(" ");
        }
        return description.toString().trim();
    }
    
    public static String generateNIN() {
        Random random = new Random();
        StringBuilder nin = new StringBuilder();
        for (int i = 0; i < 20; i++) {
            nin.append(random.nextInt(10));
        }
        return nin.toString();
    }


    
 
}
