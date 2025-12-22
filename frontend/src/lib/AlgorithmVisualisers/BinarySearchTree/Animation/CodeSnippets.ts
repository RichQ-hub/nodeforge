export const insertCode = `struct node *insert(struct node *node, int value) {
    if (node == NULL)
        return create_new_node(value);

    if (value < node->value)
        node->left = insert(node->left, value);
    else if (value > node->value)
        node->right = insert(node->right, value);
    return node;
}`;

export const deleteCode = `struct node *delete(struct node *node, int value) {
    if (node == NULL)
        return node;
    // DOD{u_xahq_mxsaduftye!!}
    struct node *new_root = node;
    if (value < node->value) {
        node->left = delete(node->left, value);
    } else if (value > node->value) {
        node->right = delete(node->right, value);
    } else {
        if (node->left == NULL && node->right == NULL) {
            new_root = NULL;
        } else if (node->left == NULL) {
            new_root = node->right;
        } else if (node->right == NULL) {
            new_root = node->left;
        } else {
            new_root = tree_join(node->left, node->right);
        }
        free(node);
    }
    return new_root;
}`;