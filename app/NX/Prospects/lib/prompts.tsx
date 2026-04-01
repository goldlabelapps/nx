export const promptMagentoPlugin = ({
    first_name,
    last_name,
    person_linkedin_url,
    title,
    company_name,
    seniority,
    sub_departments,
    country,
    primary_intent_topic,
    primary_intent_score,
    secondary_intent_topic,
    secondary_intent_score,
}: {
    first_name: string;
    last_name: string;
    person_linkedin_url: string;
    title?: string;
    company_name?: string;
    seniority?: string;
    sub_departments?: string;
    country?: string;
    primary_intent_topic?: string;
    primary_intent_score?: string;
    secondary_intent_topic?: string;
    secondary_intent_score?: string;
}) => {
    return `You are an expert in crafting highly personalized sales outreach emails.

Target: ${first_name} ${last_name}${title ? `, ${title}` : ''}${company_name ? ` at ${company_name}` : ''}
Seniority: ${seniority || 'N/A'}
Department: ${sub_departments || 'N/A'}
Country: ${country || 'N/A'}
LinkedIn: ${person_linkedin_url}
${primary_intent_topic ? `Primary Intent: ${primary_intent_topic} (Score: ${primary_intent_score || 'N/A'})` : ''}
${secondary_intent_topic ? `Secondary Intent: ${secondary_intent_topic} (Score: ${secondary_intent_score || 'N/A'})` : ''}
Instructions:
1. Research the LinkedIn profile and provided details. Focus on their current and past experience, role, department, and any e-commerce or Magento-related activities.
2. Use the intent topics and scores to infer their interests or pain points if relevant.
3. Write a highly personalized introductory paragraph for an email, referencing specific details from their background, company, or region that relate to Magento or e-commerce challenges.
4. Briefly introduce our offer: a free Magento 2 plugin for EchoPay, enabling merchants to offer Buy Now, Pay Later (BNPL) at checkout. The plugin is free, easy to install, and helps increase conversion rates and average order value for Magento stores.
5. End with a call to action, inviting them to a demo or to request more information about how the plugin can benefit their store.

Output the fully personalized email.`;
};